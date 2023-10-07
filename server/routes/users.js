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
  } catch(error) {
    console.error("Error fetching progress:", error);
    response.json({exponents: null, derivatives: null})
  }
});

usersRoutes.route("/classProgress").get(checkAuthenticated, async function (req, response) {
  const user = req.session.passport.user.username;
  const questionTopics = {
    "derivatives": [
      {
        topicId: 210,
        topicName: "simplePowerRule",
      },
      {
        topicId: 220,
        topicName: "simplePowerRuleWithIntegerCoefficient",
      },
      {
        topicId: 230,
        topicName: "simplePowerRuleWithFractionalCoefficient",
      },
      {
        topicId: 240,
        topicName: "simplePowerRuleWithNegativeExponent",
      },
      {
        topicId: 250,
        topicName: "simplePowerRuleWithNegativeExponentAndIntegerCoefficient", 
      },
      {
        topicId: 260,
        topicName: "simplePowerRuleWithNegativeExponentAndFractionalCoefficient",
      },
      {
        topicId: 270,
        topicName: "simplePowerRuleWithFractionalExponent",
      },
      {
        topicId: 280,
        topicName: "simplePowerRuleWithFractionalExponentAndIntegerCoefficient",
      },
      {
        topicId: 290,
        topicName: "simplePowerRuleWithFractionalExponentAndFractionalCoefficient",
      },
      {
        topicId: 300,
        topicName: "simplePowerRuleWithNegativeFractionalExponent",
      },
      {
        topicId: 310,
        topicName: "simplePowerRuleWithNegativeFractionalExponentAndIntegerCoefficient",
      },
      {
        topicId: 320,
        topicName: "simplePowerRuleWithNegativeFractionalExponentAndFractionalCoefficient",
      },                           
      {
        topicId: 330,
        topicName: "powerRuleMix",
      },                           
  ],
    "exponents": [
      {
        topicId: 10,
        topicName: "rewriteNegativeExponents",
      },
      {
        topicId: 20,
        topicName: "rewriteFractionalExponents",
      },
      {
        topicId: 30,
        topicName: "useNegativeExponents",
      },
      {
        topicId: 40,
        topicName: "useFractionalExponents",
      },
    ],
  }
  let query = { username: user};
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
    let usersData = [];
    // let results =  await dbo.client.db("employees")
    //   .collection("userData")
    //   .findOne(query, projection)
    let results =  await dbo.client.db("employees")
      .collection("userData")
      .find({}, projection)    
    // if (results.progress) {
    //   if (results.progress.calculus.exponents) {
    //     exponentsData = results.progress.calculus.exponents.skillData;
    //   }
    //   if (results.progress.calculus.derivatives) {
    //     derivativesData = results.progress.calculus.derivatives.skillData;
    //   }
    // }
    let userData = {};
    let user = "";
    let userSuccessArray = [];
    for await (const result of results) {
      derivativesData = [];
      // below is inside users loop
      if (result.progress) {
        if (result.progress.calculus) {
          if (result.progress.calculus.derivatives) {
            derivativesData = result.progress.calculus.derivatives.skillData;
           }
        }
      }
      userData = {};
      userSuccessArray = [];
      user = '';
      successCount = 0;
      for (let i = 0; i < questionTopics.derivatives.length; i++) {
        let successCount = 0
        for (let j = 0; j < derivativesData.length; j++) {
          if (questionTopics.derivatives[i].topicName == derivativesData[j].skill) {
            successCount = successCount + 1;
          }
        }
        userSuccessArray.push(successCount);
        
      }

      // for (let i = 0; i < questionTopics.derivatives.length; i++) {
      //   let successCount = 0
      //   for (let j = 0; j < derivativesData.length; j++) {
      //     if (questionTopics.derivatives[i].topicName == derivativesData[j].skill) {
      //       successCount = successCount + 1;
      //     }
      //   }
      //   userSuccessArray.push(successCount);
      // }
      userData = {username:result.username, logins: result.loginCount, totalQuestions: result.totalQuestionsAttempted, userSuccessArray: userSuccessArray}
      usersData.push(userData);
    }
    response.json({questionTopics: questionTopics, usersData: usersData, exponents: exponentsData, derivatives: derivativesData});
  } catch(error) {
    console.error("Error fetching progress:", error);
    response.json({questionTopics: null, usersData: null, exponents: null, derivatives: null})
  }
});

module.exports = usersRoutes;
