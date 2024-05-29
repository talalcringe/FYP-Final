import React, { useState, useEffect } from "react";
import { AudioButton } from "./MusicIcons";
import { getDefaultMusicUrl, searchMusic, headers } from "../../utils/urls";
import Loader from "../../assets/loader.gif";

const AudioSettingsModal = ({ onSelectAudio }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioUpload, setAudioUpload] = useState(null);
  const [audioList, setAudioList] = useState([]);
  const [freesoundResults, setFreesoundResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedResults, setDisplayedResults] = useState(8);
  const [searching, setSearching] = useState(false);
  const [fetching, setFetching] = useState(false);

  const handleAudioSelection = (audioInfo) => {
    setSelectedAudio(audioInfo.name === selectedAudio ? null : audioInfo.name);
    onSelectAudio(audioInfo.url);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const uploadAudio = () => {
  //   if (audioUpload == null) return;
  //   const audioRef = ref(storage, `audio/${audioUpload.name + v4()}`);
  //   uploadBytes(audioRef, audioUpload).then(() => {
  //     alert("Audio uploaded");
  //   });
  // };

  const searchFreesoundAudio = async (e) => {
    e.preventDefault();
    setSearching(true);
    let response = await fetch(searchMusic(searchQuery), {
      method: "GET",
      headers,
      credentials: "include",
    });
    response = await response.json();
    setSearching(false);
    if (response.success == true) {
      setFreesoundResults(response.data);
    }
  };

  useEffect(() => {
    setFetching(true);
    const getAllDefaultMusic = async (req, res, next) => {
      let response = await fetch(getDefaultMusicUrl, {
        method: "GET",
        headers,
        credentials: "include",
      });
      response = await response.json();
      setFetching(false);

      if (response.success == true) {
        setAudioList(response.data);
      }
    };
    getAllDefaultMusic();
  }, []);

  // const loadMoreResults = async () => {
  //   try {
  //     const apiKey = "MapqUvbtruxt9yDY3UTnL9SQISAkmHXOm3RKNIBU";
  //     const nextPage = Math.ceil(displayedResults / 10) + 1;

  //     const response = await axios.get(
  //       "https://freesound.org/apiv2/search/text/",
  //       {
  //         params: {
  //           query: searchQuery,
  //           token: apiKey,
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
  //         `https://freesound.org/apiv2/sounds/${result.id}/?token=${apiKey}&format=json`
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

  return (
    <>
      <AudioButton onClick={handleShowModal} />

      <div
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className="w-full py-4 border rounded-md"
      >
        {/* Section for Freesound audio */}
        <div className="border-b">
          <h3 className="text-center mt-5 font-semibold">Freesound Audio</h3>
          <div className="flex justify-center gap-2 items-center">
            <form action="" onSubmit={searchFreesoundAudio}>
              <input
                type="text"
                placeholder="Search Freesound Audio"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border p-2 border-black rounded-full"
              />
              <button
                className="rounded-full bg-blue text-white px-4 p-2 disabled:bg-gray-500"
                disabled={searching || fetching}
              >
                {searching ? "Searching" : "Search"}
              </button>
            </form>
          </div>

          {/* Audio selection and load more results */}
          <div className="audio-selection flex justify-between gap-2 flex-wrap px-4 mt-3">
            {freesoundResults.map((audioInfo, index) => (
              <div key={index} className="w-[45%]">
                <button
                  onClick={() => handleAudioSelection(audioInfo)}
                  className={`button ${
                    selectedAudio === audioInfo.name
                      ? "border-yellow bg-gra-400 p-3 rounded-md bg-yellow"
                      : "bg-gray-400 p-3 rounded-md text-white"
                  }`}
                >
                  {audioInfo.name}
                </button>
                <div>
                  {selectedAudio === audioInfo.name && (
                    <audio key={audioInfo.name} controls>
                      <source src={audioInfo.url} type="audio/mp3" />
                      Your browser does not support the audio tag.
                    </audio>
                  )}
                </div>
              </div>
            ))}
            {searching && (
              <div className="flex justify-center mt-2">
                <img src={Loader} alt="" className="w-10 h-10 rounded-full" />
              </div>
            )}
            {/* <button
              onClick={loadMoreResults}
              style={{
                color: "white",
                backgroundColor: "black",
                padding: "1vw",
                margin: "0.5vw",
                minWidth: "max-content",
                width: "100%", // Ensure the button takes full width
              }}
            >
              Load More
            </button> */}
          </div>
        </div>

        {/* Section for Firebase audio */}
        <div className="text-center py-5">
          <div>
            {fetching ? (
              <>
                <div className="flex justify-center mt-5">
                  <img src={Loader} alt="" className="w-10 h-10 rounded-full" />
                </div>
              </>
            ) : (
              <>
                <h3 className="font-semibold">Default Firebase Audio</h3>
                {audioList.map((audioInfo) => (
                  <button
                    key={audioInfo.name}
                    onClick={() => handleAudioSelection(audioInfo)}
                    className={`button ${
                      selectedAudio === audioInfo.name ? "active" : ""
                    }`}
                    style={{
                      backgroundColor: "#2ecc71",
                      border:
                        selectedAudio === audioInfo.name
                          ? "4px white solid"
                          : "none",
                      padding:
                        selectedAudio === audioInfo.name ? "1vw" : "0.5vw",
                      margin: "0.5vw",
                      minWidth: "max-content",
                    }}
                  >
                    {audioInfo.name}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Audio upload section */}
          <div className="audio-upload" style={{ textAlign: "center" }}>
            <input
              type="file"
              onChange={(event) => setAudioUpload(event.target.files[0])}
              style={{
                padding: "1vw",
                margin: "0.5vw auto",
                minWidth: "max-content",
              }}
            />
            <button
              // onClick={uploadAudio}
              style={{
                color: "white",
                backgroundColor: "black",
                padding: "1vw",
                margin: "0.5vw",
                minWidth: "max-content",
              }}
            >
              Upload Audio
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioSettingsModal;
