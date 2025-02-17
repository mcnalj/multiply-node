var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// This is how we would server index from the server side if we weren't serving the React build folder.
/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log("We got to index.js /")
//   res.render('index', { title: 'Express' });
// });

router.get('/markdownService', async function(req, res, next) {
  try {
    const markdownFilePath = path.join(__dirname, '../public/markdown/newtonsLaw.md');
    const data = await readFile(markdownFilePath, 'utf8')
    res.setHeader('Content-Type', 'text/markdown');
    res.send(data);
  } catch (error) {
    console.error('Error reading markdown file:', error);
    if (error.code === 'ENOENT') {
      res.status(404).send('Markdown file not found.')  
    } else {
      res.status(500).send('An error occurred while reading the markdown file.')
    }
  }
})

router.get('/markdownPrivacyPolicy', async function(req, res, next) {
  try {
    const markdownFilePath = path.join(__dirname, '../public/markdown/privacy_policy.md');
    const data = await readFile(markdownFilePath, 'utf8')
    res.setHeader('Content-Type', 'text/markdown');
    res.send(data);
  } catch (error) {
    console.error('Error reading markdown file:', error);
    if (error.code === 'ENOENT') {
      res.status(404).send('Markdown file not found.')  
    } else {
      res.status(500).send('An error occurred while reading the markdown file.')
    }
  }
})

router.get('/markdownTermsOfService', async function(req, res, next) {
  try {
    const markdownFilePath = path.join(__dirname, '../public/markdown/terms_of_service.md');
    const data = await readFile(markdownFilePath, 'utf8')
    res.setHeader('Content-Type', 'text/markdown');
    res.send(data);
  } catch (error) {
    console.error('Error reading markdown file:', error);
    if (error.code === 'ENOENT') {
      res.status(404).send('Markdown file not found.')  
    } else {
      res.status(500).send('An error occurred while reading the markdown file.')
    }
  }
})

module.exports = router;
