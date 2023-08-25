var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

// This is how we would server index from the server side if we weren't serving the React build folder.
/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log("We got to index.js /")
//   res.render('index', { title: 'Express' });
// });

router.get('/markdownService', function(req, res, next) {

  const markdownFilePath = path.join(__dirname, '../public/markdown/newtonsLaw.md');

  fs.readFile(markdownFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading markdown file.')
    }
    res.send(data);
  })
});


module.exports = router;
