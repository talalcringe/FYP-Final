require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEN_AI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = GEN_AI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are an expert author, writer and editor who has written many best selling novels. You are tasked with helping an inexperienced author who is having difficulties in writing their book. The author may ask you to summarize content, write character descriptions, brainstorm ideas, ask about writing techniques etc. Make sure your answers are to the point and do not contain any commentary of your own or a conclusion about it at the end. if the user enters something unrelated or irrelevant to writing, handle it accordingly by saying that it is outside your scope to answer.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function getModelResponse(prompt, history) {
  let pastHistory = [];
  if (history) {
    pastHistory = history;
  }
  const chatSession = model.startChat({
    generationConfig,
    history: pastHistory,
  });

  const result = await chatSession.sendMessage(prompt);

  const answer = result.response.text();
  return answer;
}

module.exports = getModelResponse;
