var express = require('express');
var quizRoutes = express.Router();
const dbo = require("../db/conn");
const { response } = require('../app');
const fetch = require('node-fetch');
const axios = require('axios');


quizRoutes.route("/getQuestions/:category").get(checkAuthenticated, async function (req, res) {
  try {
    const category = req.params.category
    const reqURL = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`
    // const reqURL = `https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple`
    // const response = await axios.get("https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple")
    const response = await axios.get(reqURL)
    console.log("made the request");
    console.log(response.data)
    res.json(response.data);
  } catch (e) {
    console.error(e);
    return e.message
  }
});

quizRoutes.route("/getAPI").get(async function (req, res) {
  try {
    const response = await fetch('https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=GOOGL%2CAMZN%2CAAPL%2CBA%2CCOIN%2CCVS%2CGS%2CMS%2CNVDA%2CPYPL%2CPFE%2CCRM%2CSBUX%2CTSLA%2CDIS%2CVTI%2CLI',
    {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': '5e4d0eeb5bmsh1f0574004d6dfb6p160e9fjsnd9a3ae03ad63',
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
      }
    })
    data = await response.json()
    // res.locals.data.quoteResponse.results = data.quoteResponse.results
    console.log(data.quoteResponse)

  } catch (e) {
    console.error(e);
    return e.message
  }
  res.json(data.quoteResponse);
});

quizRoutes.route("/getAPIAxios").get(async function (req, res) {
  try {
    const response = await axios.get('https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=GOOGL%2CAMZN%2CAAPL%2CBA%2CCOIN%2CCVS%2CGS%2CMS%2CNVDA%2CPYPL%2CPFE%2CCRM%2CSBUX%2CTSLA%2CDIS%2CVTI%2CLI',
    {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': '5e4d0eeb5bmsh1f0574004d6dfb6p160e9fjsnd9a3ae03ad63',
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
      }
    })
    // data = await response.json()
    // res.locals.data.quoteResponse.results = data.quoteResponse.results
    // console.log(data.quoteResponse)
    console.log(response.data)
    res.json(response.data.quoteResponse);
  } catch (e) {
    console.error(e);
    return e.message
  }
});

quizRoutes.route("/fetch").get(async function (req, response) {
  console.log("got to the quiz route");
  // let db_connect = dbo.getDb();
  let db_connect = await dbo.client.db("calculus")
  let myQuery = {unitName: "derivatives"};
  console.log(myQuery);
  let projection = { _id: false, unitTopics: true}
  db_connect.collection("units")
    .findOne(myQuery, projection, function (err, res) {
      if (err) throw err;
      console.log(res);
      response.json(res);
  });
});

module.exports = quizRoutes;
