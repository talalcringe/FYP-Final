const baseURl = `http://localhost:8080/api`;

const authURLs = `${baseURl}/auth`;

export const getLoginUrl = `${authURLs}/getAuthURL`;

const contentURLs = `${baseURl}/content`;

export const sendTextUrl = `${contentURLs}/createTextFilesAndUpload`;

export const createPageFolderAndGetIdUrl = (pageId) =>
  `${contentURLs}/createPageFolder/${pageId}`;

const userRoutes = `${baseURl}/user`;

export const getImagesUrl = (query) => `${userRoutes}/images/${query}`;
export const getDefaultMusicUrl = `${userRoutes}/getDefaultMusic`;
export const searchMusic = (query) =>
  `${userRoutes}/searchMusicSound?query=${query}`;

export const askTheBot = `${userRoutes}/askourbot`;

export const getAllChats = `${userRoutes}/getAllChats`;

export const fetchOneChat = (id) => `${userRoutes}/getOneChat/${id}`;

export const startNewchat = (id) => `${userRoutes}/newChat/${id}`;

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};
