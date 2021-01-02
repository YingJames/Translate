const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
const fetch = require("node-fetch");
require("dotenv").config();
const express = require("express");
const app = express();

// IF anybody wants to connect, you need to start listening
const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => console.log(`listening on Port ${port}`));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
// ~~~~~~~~~~~~~

// Receive chinese search
app.post("/search", async (request, response) => {
  const chineseInput = request.body.query;
  const englishText = await Translate(chineseInput);
  const gifURL = await getGiphyURL(englishText);
  
  response.json({
    status: "success",
    search: chineseInput,
    translation: englishText,
    gifURL: gifURL,
  });
  // const gifURL = await getGiphyURL(englishText)
});

async function Translate(chineseInput) {
  const languageTranslator = new LanguageTranslatorV3({
    version: "2018-05-01",
    authenticator: new IamAuthenticator({
      apikey: process.env.IBM_KEY,
    }),
    serviceUrl:
      "https://api.us-south.language-translator.watson.cloud.ibm.com/instances/5fa8162f-5fa2-4751-9143-d525052ae610",
  });

  const translateParams = {
    text: chineseInput,
    modelId: "zh-en",
  };
  const translationResult = await languageTranslator.translate(translateParams);
  const jsonStringify = await JSON.stringify(translationResult, null, 2);
  const jsonParse = await JSON.parse(jsonStringify);
  const englishText = await jsonParse.result.translations[0].translation;
  return englishText;
}

async function getGiphyURL(query) {
  const apiKey = process.env.GIPHY_KEY;
  const limit = "1";
  const offset = "0";
  const rating = "g";
  const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=en`;

  const response = await fetch(giphyAPI);
  const json = await response.json();
  const url = await json.data[0].images["original"].url;
  return url;
}


