require("dotenv").config();
const { google } = require("googleapis");
const CustomError = require("../ErrorHandling/Error");
const { oAuth2Client } = require("../utils/oAuth.js");
const Project = require("../models/Project");
const User = require("../models/User");
const { Readable } = require("stream");
const Sprint = require("../models/Sprint");
const { generateResponseWithPayload } = require("../utils/helpers.js");

exports.handleFormSubmission = async (req, res, next) => {
  try {
    const {
      title,
      authors,
      subtitle,
      seriesInfo,
      description,
      image,
      genre,
      projectId,
    } = req.body;

    const { userId } = req.userData;

    // Validate input data if necessary
    if (!title || !authors) {
      console.log("ENTERED HERE");
      throw new CustomError(400, "Required fields are missing");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    await Project.create({
      title,
      authors,
      subtitle,
      seriesInfo,
      description,
      image,
      genre,
      projectId,
    });

    user.projects.push(projectId);
    await user.save();

    const data = {
      projectId,
      title,
      authors,
      subtitle,
      seriesInfo,
      description,
      genre,
      image,
    };
    const response = generateResponseWithPayload(
      200,
      true,
      "Project Created Successfully",
      data
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

//Create Page Folder on drive for new page
exports.createPageFolder = async (req, res, next) => {
  const { token } = req.userData;
  try {
    const { pagenumber } = req.params;

    if (!pagenumber) {
      throw new CustomError(
        400,
        "Invalid Request - ID or Page Number not found"
      );
    }

    // Set up Google Drive API
    oAuth2Client.setCredentials(token);
    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    // Ensure the "ProductiveWriting" folder exists and get its ID
    const productiveWritingFolderId = await ensureSiteFolderExists(drive);

    // Check if the folder for the page number exists
    const pageFolderId = await getPageFolderId(
      drive,
      productiveWritingFolderId,
      pagenumber
    );

    if (!pageFolderId) {
      // Folder for the page number doesn't exist, create it
      const folderMetadata = {
        name: `Page_${pagenumber}`,
        mimeType: "application/vnd.google-apps.folder",
        parents: [productiveWritingFolderId],
      };

      const folder = await drive.files.create({
        resource: folderMetadata,
        fields: "id",
      });

      console.log(
        `Folder for Page ${pagenumber} created successfully: ${folder.data.id}`
      );
      res.status(200).json({
        message: "Folder created successfully",
        success: true,
        folderId: folder.data.id,
      });
    } else {
      // Folder for the page number already exists
      console.log(
        `Folder for Page ${pagenumber} already exists: ${pageFolderId}`
      );
      res.status(200).json({
        message: "Folder already exists",
        success: true,
        folderId: pageFolderId,
      });
    }
  } catch (error) {
    return next(error);
  }
};

//create Text Files And Upload to drive
exports.createPageFilesAndUpload = async (req, res, next) => {
  const { token } = req.userData;
  try {
    const payload = req.body;
    let { id, data } = payload;
    let { projectId, content, words } = data;

    let fileName = `${id}.txt`;

    // Check if a file with the same name already exists in Google Drive
    // let fileExists = await checkFileExistsInDrive(fileName, token);

    // If file exists, increment max value, create new filename and upload
    // while (fileExists) {
    //   max++;
    //   fileName = `page_${pagenum}_v${max}.txt`;
    //   fileExists = await checkFileExistsInDrive(fileName, token);
    // }

    // Upload the text file to Google Drive
    await uploadPageFileToDrive(fileName, projectId, token, payload);

    return res.status(200).json({
      success: true,
      message: "File created and uploaded successfully.",
    });
  } catch (error) {
    console.error("Error creating and uploading text file:", error);
  }
};

exports.ensureFoldersExist = async (req, res, next) => {
  const { token } = req.userData;
  try {
    const { projectId } = req.params;

    if (!projectId) {
      throw new CustomError(400, "Invalid Request - ID or Project not found");
    }
    // Set up Google Drive API
    oAuth2Client.setCredentials(token);
    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    // Ensure the "ProductiveWriting" folder exists and get its ID
    const productiveWritingFolderId = await ensureSiteFolderExists(drive);

    const projectFolderId = await getProjectFolderId(
      drive,
      productiveWritingFolderId,
      projectId
    );

    if (!projectFolderId) {
      // Folder for the page number doesn't exist, create it
      // const folderMetadata = {
      //   name: projectFolderId,
      //   mimeType: "application/vnd.google-apps.folder",
      //   parents: [productiveWritingFolderId],
      // };

      // const folder = await drive.files.create({
      //   resource: folderMetadata,
      //   fields: "id",
      // });

      console.log(
        `Folder for Porject ${projectFolderId} created successfully: ${folder.data.id}`
      );
      // res.status(200).json({
      //   message: "Folder created successfully",
      //   success: true,
      //   folderId: folder.data.id,
      // });
      next();
    } else {
      // Folder for the page number already exists
      console.log(
        `Folder for project ${projectId} already exists: ${projectFolderId}`
      );
      // res.status(200).json({
      //   message: "Folder already exists",
      //   success: true,
      //   folderId: projectFolderId,
      // });
      next();
    }
  } catch (error) {
    return next(error);
  }
};

//Helpers--------------------------------------------------------------

async function uploadPageFileToDrive(fileName, projectId, token, payload) {
  oAuth2Client.setCredentials(token);
  // console.log(token);

  const drive = google.drive({ version: "v3", auth: oAuth2Client });

  // Ensure the "ProductiveWriting" folder exists and get its ID
  const productiveWritingFolderId = await ensureSiteFolderExists(drive);

  const projectFolderId = await getProjectFolderId(
    drive,
    productiveWritingFolderId,
    projectId
  );

  if (!projectFolderId) {
    throw new CustomError(404, `Folder for Project ${projectId} not found`);
  }

  const fileMetadata = {
    name: fileName,
    parents: [projectFolderId], // Specify the folder ID as the parent
  };

  const updatefileMetadata = {
    name: fileName, // Specify the folder ID as the parent
  };

  const media = {
    mimeType: "text/plain",
    body: textToStream(JSON.stringify(payload)),
  };

  const fileExists = await checkFileExistsInDrive(fileName, token);

  if (fileExists) {
    // Update the text file
    drive.files.update(
      {
        resource: updatefileMetadata,
        media: media,
        fields: "id",
        fileId: fileExists,
      },
      (err, file) => {
        oAuth2Client.setCredentials(null);

        if (err) {
          console.error("Error uploading text file:", err);
          throw new CustomError(500, `Error uploading text file`);
        }

        console.log(`Text file uploaded successfully: ${file.data.id}`);
      }
    );
  } else {
    // Upload the text file
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      (err, file) => {
        oAuth2Client.setCredentials(null);

        if (err) {
          console.error("Error uploading text file:", err);
          throw new CustomError(500, `Error uploading text file`);
        }

        console.log(`Text file uploaded successfully: ${file.data.id}`);
      }
    );
  }
}

async function checkFileExistsInDrive(fileName, token) {
  try {
    // Create an OAuth2 client with the given credentials
    oAuth2Client.setCredentials(token);

    // Use the Google Drive API to list files
    const drive = google.drive({ version: "v3", auth: oAuth2Client });
    const response = await drive.files.list({
      q: `name='${fileName}'`,
    });
    // If files with the same name are found, return true
    if (response.data.files.length > 0) {
      return response.data.files[0].id;
    }
  } catch (error) {
    console.error("Error checking file existence in Google Drive:", error);
    throw error;
  }
}

async function ensureSiteFolderExists(drive) {
  try {
    // Check if the "ProductiveWriting" folder exists
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder' and name='ProductiveWriting'",
      fields: "files(id)",
    });

    if (response.data.files.length === 1) {
      // "ProductiveWriting" folder exists, return its ID
      return response.data.files[0].id;
    } else {
      // "ProductiveWriting" folder doesn't exist, create it
      const folderMetadata = {
        name: "ProductiveWriting",
        mimeType: "application/vnd.google-apps.folder",
      };

      const folder = await drive.files.create({
        resource: folderMetadata,
        fields: "id",
      });

      console.log("ProductiveWriting folder created successfully");
      return folder.data.id;
    }
  } catch (error) {
    console.error("Error ensuring folder exists:", error);
    throw error;
  }
}

async function getProjectFolderId(drive, parentFolderId, projectId) {
  try {
    const response = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${projectId}' and '${parentFolderId}' in parents`,
      fields: "files(id)",
    });

    if (response.data.files.length === 1) {
      return response.data.files[0].id;
    } else if (
      response.data.files.length > 1 ||
      response.data.files.length < 1
    ) {
      // Folder for the page number doesn't exist, create it
      const folderMetadata = {
        name: `${projectId}`,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      };

      const folder = await drive.files.create({
        resource: folderMetadata,
        fields: "id",
      });

      console.log(
        `Folder for Project ${projectId} created successfully: ${folder.data.id}`
      );
      return folder.data.id;
    }
  } catch (error) {
    console.error("Error getting or creating project folder ID:", error);
    throw error;
  }
}

async function getPageFolderId(drive, parentFolderId, pagenum) {
  try {
    const response = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='Page_${pagenum}' and '${parentFolderId}' in parents`,
      fields: "files(id)",
    });

    if (response.data.files.length === 1) {
      return response.data.files[0].id;
    } else {
      // Folder for the page number doesn't exist, create it
      const folderMetadata = {
        name: `Page_${pagenum}`,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      };

      const folder = await drive.files.create({
        resource: folderMetadata,
        fields: "id",
      });

      console.log(
        `Folder for Page ${pagenum} created successfully: ${folder.data.id}`
      );
      return folder.data.id;
    }
  } catch (error) {
    console.error("Error getting or creating page folder ID:", error);
    throw error;
  }
}

function textToStream(text) {
  const readableStream = new Readable();
  readableStream.push(text);
  readableStream.push(null);
  return readableStream;
}

exports.createSprint = async () => {
  try {
    const { projectid, targetTime, numberOfWords } = req.body;

    const project = await Project.findById(projectid);

    if (!project) {
      throw new CustomError(404, "No Sprint found");
    }

    const date = new Date().toDateString();

    const sprint = await Sprint.create({
      numberOfWords,
      date,
      targetTime,
    });

    project.sprints.push(sprint._id);

    await project.save();
  } catch (error) {
    next(error);
  }
};

exports.modifySprintStatus = async () => {
  try {
    const { sprintid } = req.params;

    const { projectid, status } = req.body;

    const project = await Project.findById(projectid);

    if (!project) {
      throw new CustomError(404, "No project found");
    }

    const sprint = project.sprints.find((item) => item === sprintid);

    if (!sprint) {
      throw new CustomError(404, "No Sprint found");
    }

    sprint.status = status;

    await sprint.save();

    const response = generateResponseWithPayload(
      201,
      true,
      "Sprint Created Successfully",
      sprint._id
    );

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const { projects } = req.user;

    const response = generateResponseWithPayload(
      201,
      true,
      "Sprint Created Successfully",
      projects
    );
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.getSprintHistoryOfAProject = async (req, res, next) => {
  try {
    const { projectid } = req.params;

    const { projects } = req.user;

    const targetProject = projects.find((item) => item === projectid);

    if (!targetProject) {
      throw new CustomError(404, "No Project found");
    }

    const targetSprints = targetProject.sprints;

    const response = generateResponseWithPayload(
      201,
      true,
      "Sprint Created Successfully",
      targetSprints
    );
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
