const LanguageTranslatorV3 = require("ibm-watson/language-translator/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
const express = require("express");
const express = require("express");
const app = express();

// IF anybody wants to connect, you need to start listening
app.listen(3000, () => console.log('listening on Port 3000'));
app.use(express.static('public'));

// ~~~~~~~~~~~~~

// Receive chinese search 
app.post('/api', (request, response) => {
  // console.log('request on index.js:', request);
  const query = request;
  Translate(query);
});

function Translate(chineseInput) {
  const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
      apikey: '0X3TZ4DS7Ck7osm8Yh7FnCeRpFZ6wAhqisW8zuStG4bW',
    }),
    serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/5fa8162f-5fa2-4751-9143-d525052ae610',
  });
  
  const translateParams = {
    text: chineseInput,
    modelId: 'zh-en',
  };
  
  languageTranslator.translate(translateParams)
    .then(response => JSON.stringify(response, null, 2))
    .then(jsonStringify => JSON.parse(jsonStringify))
    .then(translationResult => console.log(translationResult.result.translations[0].translation))
    .then(english => {
      let translationResult = document.getElementById('translationResult')
      translationResult.innerHTML = `${translateParams.text} => ${english}`
      setup(english)
    })
    .catch(err => console.log('error:', err))
}