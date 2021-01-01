const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
const fetch = require("node-fetch");
const express = require("express");
const app = express();

// IF anybody wants to connect, you need to start listening
app.listen(3000, () => console.log("listening on Port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
// ~~~~~~~~~~~~~

// Receive chinese search
app.post("/search", (request, response) => {
  const chineseInput = request.body.query;
  response.json = {
    status: "success",
    search: chineseInput,
  };
  const 
});

async function Translate(chineseInput) {
  const languageTranslator = new LanguageTranslatorV3({
    version: "2018-05-01",
    authenticator: new IamAuthenticator({
      apikey: "0X3TZ4DS7Ck7osm8Yh7FnCeRpFZ6wAhqisW8zuStG4bW",
    }),
    serviceUrl:
      "https://api.us-south.language-translator.watson.cloud.ibm.com/instances/5fa8162f-5fa2-4751-9143-d525052ae610",
  });

  const translateParams = {
    text: chineseInput,
    modelId: "zh-en",
  };

  let translate = await languageTranslator.translate(translateParams);
  let jsonStringify = await JSON.stringify(translate, null, 2);
  let jsonParse = await JSON.parse(jsonStringify);
  let translationResult = await jsonParse.result.translation[0].translation;
  return translationResult;
}

function getGiphyURL(query, translationResult) {
  const apiKey = "i0YNx60dA7EtWa0WIt3490EklKT1h7Ib";
  const limit = "1";
  const offset = "0";
  const rating = "g";
  const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=en`;

  getGIF(giphyAPI)
    .then(url => {
      const data = { translationResult, url };
      console.log(data);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    })
    .catch(err => {
      console.error("There is no gif for this search term:", err);
    });
}

async function getGIF(giphyAPI) {
  const response = await fetch(giphyAPI);
  const json = await response.json();
  const url = json.data[0].images["original"].url;
  return url;
}
