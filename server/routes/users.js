var express = require('express');
var usersRoutes = express.Router();
const dbo = require("../db/conn");

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next()}
  res.json({msg: "Not authenticated. Redirect to login.", authenticated: false});
}

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

usersRoutes.route('/').get(function(req, res, next) {
   res.send('respond with a resource');
});


// Separate for progress in Calculus and Progress in Exponents.
// TODO: If there is no progress for this user, the query throws an error. It's caught,but make it more graceful.
usersRoutes.route("/userProgress").get(checkAuthenticated, async function (req, response) {
  const username = req.session.passport.user.username;
  let query = { username: username};
  let projection = { 
      _id: false,
      username: true,
      progress: {
        $cond: {
          if: { $ifNull: ['$progress', false]},
          then: '$progress',
          else: '$$REMOVE'
        }
      },
      }
  try {
    let exponentsData = [];
    let derivativesData = [];
    let results =  await dbo.client.db("employees")
      .collection("userData")
      .findOne(query, projection)
    if (results.progress) {
      if (results.progress.calculus.exponents) {
        exponentsData = results.progress.calculus.exponents.skillData;
      }
      if (results.progress.calculus.derivatives) {
        derivativesData = results.progress.calculus.derivatives.skillData;
      }
    }
    response.json({exponents: exponentsData, derivatives: derivativesData});
  } catch {
    console.log("Error fetching");
    response.json({exponents: null, derivatives: null})
  }
});

module.exports = usersRoutes;
