const { validationResult } = require("express-validator");
const axios = require("axios"); // Ensure axios is imported
const CustomError = require("../ErrorHandling/Error");
const {
  generateResponseWithPayload,
  generateResponseWithoutPayload,
} = require("../utils/helpers");
const {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} = require("firebase/storage");
const storage = require("../config/firebase");
const audioListRef = ref(storage, "audio/");
const getModelResponse = require("../config/geminiConfig");
const User = require("../models/User");

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const FREE_SOUND_API_KEY = process.env.FREE_SOUND_API_KEY;

exports.getPixabayImages = async (req, res, next) => {
  try {
    const { query } = req.params;

    if (!query) {
      throw new CustomError(400, "Query parameter is required");
    }

    const results = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo`
    );

    if (!results || results.data.totalHits === 0) {
      throw new CustomError(404, "No images found");
    }

    const images = results.data.hits;

    const response = generateResponseWithPayload(
      200,
      true,
      "Image search successful",
      images
    );

    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

exports.createProjectController = async (req, res, next) => {
  const { title, authors, subtitle, seriesinfo, description, genre, isbn } =
    req.body;
};

exports.getDefaultMusic = async (req, res, next) => {
  try {
    const response = await listAll(audioListRef);

    const promises = response.items.map(async (item) => {
      const url = await getDownloadURL(item);
      const fileNameWithoutExtension = item.name.replace(/\.[^/.]+$/, "");
      return { name: fileNameWithoutExtension, url };
    });

    const audioInfoArray = await Promise.all(promises);
    const data = generateResponseWithPayload(
      200,
      true,
      "Music fetched successfully",
      audioInfoArray
    );
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching audio URLs: ", error);
    next(error);
  }
};

exports.searchFreesoundAudio = async (req, res, next) => {
  const searchQuery = req.query.query;

  if (!searchQuery) {
    throw new CustomError(400, "Please provide query");
  }

  try {
    const response = await axios.get(
      `https://freesound.org/apiv2/search/text/?query=${searchQuery}&token=${FREE_SOUND_API_KEY}&format=json`
    );

    const freesoundResultsData = response.data;

    if (freesoundResultsData.count === 0) {
      console.log("No Freesound audio found.");
      res.status(404).json({ message: "No Freesound audio found." }); // Send a 404 response if no audio found
    } else {
      const soundInfoPromises = freesoundResultsData.results.map(
        async (result) => {
          const soundInfoResponse = await axios.get(
            `https://freesound.org/apiv2/sounds/${result.id}/?token=${FREE_SOUND_API_KEY}&format=json`
          );

          const soundInfo = soundInfoResponse.data;
          return {
            name: soundInfo.name,
            url: soundInfo.previews
              ? soundInfo.previews["preview-hq-mp3"]
              : null,
          };
        }
      );

      const audioResults = await Promise.all(soundInfoPromises);

      const response = generateResponseWithPayload(
        200,
        true,
        "Search succesful",
        audioResults
      );
      res.status(200).json(response); // Send the results back to the client
    }
  } catch (error) {
    console.error("Error fetching Freesound audio: ", error);
    next(error); // Pass the error to the next middleware
  }
};

exports.askGemini = async (req, res, next) => {
  try {
    const { searchQuery, chatid } = req.body;
    // const { userid } = req.user;
    const userid = "665452bd455273d836cd7444";

    if (!searchQuery) {
      throw new CustomError(400, "Please provide query");
    }

    const user = await User.findById(userid);

    if (!user) {
      throw new CustomError(404, "No user found");
    }

    let targetChat = user.chats.find((item) => item.id === chatid); // Changed 'chat' to 'item'

    let targetChatHistory;

    if (!targetChat) {
      // Changed 'chat' to 'targetChat'
      targetChat = { id: Math.random().toString(), history: [] }; // Added '.toString()' to ensure 'id' is a string
      user.chats.push(targetChat); // Push the new chat to user's chats
      await user.save(); // Save the user after updating chats
    }
    targetChatHistory = targetChat.history;

    const answer = await getModelResponse(searchQuery, targetChatHistory);

    if (answer) {
      console.log("ran");
      targetChatHistory.push({
        role: "user",
        parts: [{ text: searchQuery }],
      });
      targetChatHistory.push({
        role: "model",
        parts: [{ text: answer }],
      });
    }

    await user.save();

    const response = generateResponseWithPayload(
      200,
      true,
      "Gemini Query successful",
      answer
    );
    res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};

// exports.loadMoreResults = async () => {
//   try {
//     const nextPage = Math.ceil(displayedResults / 10) + 1;

//     const response = await axios.get(
//       "https://freesound.org/apiv2/search/text/",
//       {
//         params: {
//           query: searchQuery,
//           token: FREE_SOUND_API_KEY,
//           page_size: 10,
//           page: nextPage,
//         },
//       }
//     );

//     const additionalResults = response.data.results;

//     if (additionalResults.length === 0) {
//       console.log("No additional Freesound audio found.");
//       return;
//     }

//     const soundInfoPromises = additionalResults.map(async (result) => {
//       const soundInfoResponse = await axios.get(
//         `https://freesound.org/apiv2/sounds/${result.id}/?token=${FREE_SOUND_API_KEY}&format=json`
//       );

//       const soundInfo = soundInfoResponse.data;
//       return {
//         name: soundInfo.name,
//         url: soundInfo.previews ? soundInfo.previews["preview-hq-mp3"] : null,
//       };
//     });

//     const newResults = await Promise.all(soundInfoPromises);

//     setFreesoundResults(newResults);
//     setDisplayedResults((prevCount) => prevCount + 10);
//   } catch (error) {
//     console.error("Error fetching additional Freesound audio: ", error);
//   }
// };
