const PORT = 8000;
const axios = require("axios").default;
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();

app.use(cors())

// get 사전 API
// app.get('/check', (req, res) => {
//   const word = req.query.word

//   var options = {
//     method: 'GET',
//     url: 'https://dictionary35.p.rapidapi.com/wordSearchEnglish',
//     params: { query: word },
//     headers: {
//       'x-rapidapi-host': 'dictionary35.p.rapidapi.com',
//       'x-rapidapi-key': process.env.RAPID_API_KEY
//     }
//   };

//   axios.request(options).then((response) => {
//     console.log(response.data);
//   }).catch((error) => {
//     console.error(error);
//   });

// })

// get 랜덤word API
app.get('/word', (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: { count: '5', wordLength: '5' },
    headers: {
      'x-rapidapi-host': 'random-words5.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPID_API_KEY
    }
  };

  axios.request(options).then((response) => {
    console.log(response.data);
    res.json(response.data[0])
  }).catch((error) => {
    console.error(error);
  });
})

app.listen(PORT, () => console.log('Server running on port' + PORT));

