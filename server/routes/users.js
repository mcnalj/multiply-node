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
    let trigonometricFunctionsData = [];
    let naturalExponentialLogData = [];
    let tutorialsData = [];
    let integrationData = [];
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
      if (results.progress.calculus.trigonometricFunctions) {
        trigonometricFunctionsData = results.progress.calculus.trigonometricFunctions.skillData;
      }
      if (results.progress.calculus.naturalExponentialLog) {
        naturalExponentialLogData = results.progress.calculus.naturalExponentialLog.skillData;
      }
      if (results.progress.calculus.tutorials) {
        tutorialsData = results.progress.calculus.tutorials.tutorialData;
      }
      if (results.progress.calculus.integration) {
        integrationData = results.progress.calculus.integration.skillData;
      }                  
    }
    response.json({exponents: exponentsData, derivatives: derivativesData, trigonometricFunctions: trigonometricFunctionsData, naturalExponentialLog: naturalExponentialLogData, tutorials: tutorialsData, integration: integrationData});
  } catch(error) {
    console.error("Error fetching progress:", error);
    response.json({exponents: null, derivatives: null, trigonometricFunctions: null, naturalExponentialLog: null, tutorials: null, integration: null})
  }
});

usersRoutes.route("/singleUsersProgress").post(checkAuthenticated, async function (req, response) {
  const username = req.body.username;
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
    let trigonometricFunctionsData = [];
    let naturalExponentialLogData = [];
    let tutorialsData = [];
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
      if (results.progress.calculus.trigonometricFunctions) {
        trigonometricFunctionsData = results.progress.calculus.trigonometricFunctions.skillData;
      }
      if (results.progress.calculus.naturalExponentialLog) {
        naturalExponentialLogData = results.progress.calculus.naturalExponentialLog.skillData;
      }      
      if (results.progress.calculus.tutorials) {
        tutorialsData = results.progress.calculus.tutorials.tutorialData;
      }            
    }
    response.json({exponents: exponentsData, derivatives: derivativesData, trigonometricFunctions: trigonometricFunctionsData, naturalExponentialLog: naturalExponentialLogData, tutorials: tutorialsData});
  } catch(error) {
    console.error("Error fetching progress:", error);
    response.json({exponents: null, derivatives: null, trigonometricFunctions: null, naturalExponentialLog: null, tutorials: null})
  }
});

// usersRoutes.route("/getProgress/summerPrep/multiplication").post(checkAuthenticated, async function (req, response) { 
//   const username = req.body.username;
//   let query = { username: username};
//   let projection = {
//     _id: false,
//     username: true,
//     progress: {
//       $cond: {
//         if: { $ifNull: ['$progress', false]},
//         then: '$progress',
//         else: '$$REMOVE'
//       }
//     },
//   }
//   try {
//     let multiplicationData = {
//       squares: [],
//       cubes: [],
//       mixed: []
//     };
//     let results =  await dbo.client.db("employees")
//       .collection("userData")
//       .findOne(query, projection)
//     if (results.progress) {
//       if (results.progress.summerPrep) {
//         if (results.progress.summerPrep.cubesAndSquare) {
//           if (results.progress.summerPrep.cubesAndSquare.skillData) {
//             let unfilteredData = results.progress.summerPrep.cubesAndSquare.skillData;
//             for (let i = 0; i < unfilteredData.length; i++) {
//               if (unfilteredData[i]?.skill === "squares") {
//                 multiplicationData.squares.push(unfilteredData[i]);
//               }
//               else if (unfilteredData[i]?.skill === "cubes") {
//                 multiplicationData.cubes.push(unfilteredData[i]);
//               } else if (unfilteredData[i]?.skill === "mixed") {
//                 multiplicationData.mixed.push(unfilteredData[i]);
//               }
//             }
//           }
//         }
//       }
//     }
//     response.json(multiplicationData);
//   }
//   catch(error) {
//     console.error("Error fetching progress:", error);
//     response.json(null);
//   }
// });


usersRoutes.route("/getProgress/summerPrep/functions/plottingPoints").post(checkAuthenticated, async function (req, response) { 
  const username = req.body.username;
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
    let plottingPointsData = {
      plottingPointsPolynomials: [],
      plottingPointsSine: [],
      plottingPointsCosine: []
    };
    let results =  await dbo.client.db("employees")
      .collection("userData")
      .findOne(query, projection)
    if (results.progress) {
      if (results.progress.summerPrep) {
        if (results.progress.summerPrep.functions) {
          if (results.progress.summerPrep.functions.skillData) {
            let unfilteredData = results.progress.summerPrep.functions.skillData;
            for (let i = 0; i < unfilteredData.length; i++) {
              if (unfilteredData[i]?.skill === "plottingPointsPolynomials") {
                plottingPointsData.plottingPointsPolynomials.push(unfilteredData[i]);
              }
              else if (unfilteredData[i]?.skill === "plottingPointsSine") {
                plottingPointsData.plottingPointsSine.push(unfilteredData[i]);
              } else if (unfilteredData[i]?.skill === "plottingPointsCosine") {
                plottingPointsData.plottingPointsCosine.push(unfilteredData[i]);
              }
            }
          }
        }
      }
    }
    response.json(plottingPointsData);
  }
  catch(error) {
    console.error("Error fetching progress:", error);
    response.json(null);
  }
});

usersRoutes.route("/getProgress/summerPrep/:topic").post(checkAuthenticated, async function (req, response) {
  const username = req.body.username;
  const { topic } = req.params;
  const query = { username: username };
  const projection = {
    _id: false,
    username: true,
    progress: {
      $cond: {
        if: { $ifNull: ['$progress', false] },
        then: '$progress',
        else: '$$REMOVE'
      }
    }
  };

  try {
    let topicData = {};
    const results = await dbo.client.db("employees")
      .collection("userData")
      .findOne(query, projection);

    if (results?.progress?.summerPrep?.[topic]?.skillData) {
      const unfilteredData = results.progress.summerPrep[topic].skillData;

      // Loop through the skill data and categorize them by skill name
      unfilteredData.forEach(item => {
        if (item?.skill) {
          if (!topicData[item.skill]) {
            topicData[item.skill] = []; // Create an array for the skill if it doesn't exist
          }
          topicData[item.skill].push(item); // Add the item to the appropriate skill array
        }
      });
    }
    response.json(topicData);
  } catch (error) {
    console.error("Error fetching progress:", error);
    response.status(500).json({ error: "Error fetching progress" });
  }
});

usersRoutes.route("/getProgress/calculus/:topic").post(checkAuthenticated, async function (req, response) {
  const username = req.body.username;
  const { topic } = req.params;
  const query = { username: username };
  const projection = {
    _id: false,
    username: true,
    progress: {
      $cond: {
        if: { $ifNull: ['$progress', false] },
        then: '$progress',
        else: '$$REMOVE'
      }
    }
  };

  try {
    let topicData = {};
    const results = await dbo.client.db("employees")
      .collection("userData")
      .findOne(query, projection);

    if (results?.progress?.calculus?.[topic]?.skillData) {
      const unfilteredData = results.progress.calculus[topic].skillData;

      // Loop through the skill data and categorize them by skill name
      unfilteredData.forEach(item => {
        if (item?.skill) {
          if (!topicData[item.skill]) {
            topicData[item.skill] = []; // Create an array for the skill if it doesn't exist
          }
          topicData[item.skill].push(item); // Add the item to the appropriate skill array
        }
      });
    }
    response.json(topicData);
  } catch (error) {
    console.error("Error fetching progress:", error);
    response.status(500).json({ error: "Error fetching progress" });
  }
});



// function getProgressData(results, unitName, skillsArray) {
//   let skillData = [];
//   const variables = [...myArray];
//   if (results.progress.summerPrep) {
//     if (results.progress.summerPrep[unitName]) {
//       if (results.progress.summerPrep[unitName].skillData) {
//         skillData = results.progress.summerPrep[skillName].skillData;
//         for (let i = 0; i < skillData.length; i++) {
//           for (let j = 0; j < skillsArray.length; j++) {
//             if (skillData[i]?.skill === skillsArray[j]) {
//               skillData.push(skillData[i]);
//             }
//           }
//       }
//     }
//   }
//   return skillData;
// }



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
    "trigonometricFunctions": [
      {
        topicId: 1000,
        topicName: "basicEvaluation" 
      },
      {
        topicId: 1010,
        topicName: "halfCircleEvaluation" 
      },
      {
        topicId: 1020,
        topicName: "fullCircleEvaluation" 
      },
      // {
      //   topicId: 1030,
      //   topicName: "symbolicDerivatives" 
      // },
      // {
      //   topicId: 1040,
      //   topicName: "basicDerivativesEvaluation" 
      // },
      // {
      //   topicId: 1050,
      //   topicName: "halfDerivativesEvaluation" 
      // },
      // {
      //   topicId: 1060,
      //   topicName: "fullDerivativesEvaluation" 
      // },
      {
        topicId: 1100,
        topicName: "simpleTrigonometric" 
      },
      {
        topicId: 1110,
        topicName: "simpleChainRuleTrigonometric" 
      },

    ]
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

usersRoutes.route("/singleClassProgress").get(checkAuthenticated, async function (req, response) {
  const user = req.session.passport.user.username;
  // check for the class code
  // put this in an import
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
    "trigonometricFunctions": [
      {
        topicId: 1000,
        topicName: "basicEvaluation" 
      },
      {
        topicId: 1010,
        topicName: "halfCircleEvaluation" 
      },
      {
        topicId: 1020,
        topicName: "fullCircleEvaluation" 
      },
      // {
      //   topicId: 1030,
      //   topicName: "symbolicDerivatives" 
      // },
      // {
      //   topicId: 1040,
      //   topicName: "basicDerivativesEvaluation" 
      // },
      // {
      //   topicId: 1050,
      //   topicName: "halfDerivativesEvaluation" 
      // },
      // {
      //   topicId: 1060,
      //   topicName: "fullDerivativesEvaluation" 
      // },
      {
        topicId: 1100,
        topicName: "simpleTrigonometric" 
      },
      {
        topicId: 1110,
        topicName: "simpleChainRuleTrigonometric" 
      },
    ],
    "naturalExponentialLog": [
      {
        topicId: 500,
        topicName: "naturalExponential" 
      },
      {
        topicId: 520,
        topicName: "simpleNaturalLog" 
      },
      {
        topicId: 530,
        topicName: "complexNaturalLog" 
      },
      {
        topicId: 550,
        topicName: "exponentialFunctionsBaseA" 
      },
      {
        topicId: 560,
        topicName: "logFunctionsBaseA" 
      },
    ],
    "integration": [
      {
        topicId: 3010,
        topicName: "indefiniteIntegralsSingleTerm" 
      },
      {
        topicId: 3020,
        topicName: "indefiniteIntegralsBinomial" 
      },
      {
        topicId: 3030,
        topicName: "indefiniteIntegralsPolynomial" 
      },
      {
        topicId: 3040,
        topicName: "indefiniteIntegralsTrigonometric" 
      },
      {
        topicId: 3050,
        topicName: "indefiniteIntegralsNaturalExponential"
      },
      {
        topicId: 3060,
        topicName: "indefiniteIntegralsNaturalLog"
      },
      {
        topicId: 3070,
        topicName: "definiteIntegrals"
      }
    ]    
  }
  // currently the class code is hardcoded!
  const classUsers = await dbo.client.db("employees")
  .collection("users")
  .find({'classMemberships': 'CALC23'})
  .project({'username':1, '_id': 0})
  .toArray();
  
  const classUsersArray = classUsers.map(user=>user.username);

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
    let trigonometricFunctionsData = [];
    let naturalExponentialLogData = [];
    let integrationData = [];
    let usersData = [];
    let results =  dbo.client.db("employees")
      .collection("userData")
      .find({'username': {$in: classUsersArray}}, projection)    
    let userData = {};
    let user = "";
    let exponentsSuccessArray = [];
    let derivativesSuccessArray = [];
    let trigonometricFunctionsSuccessArray = [];
    let naturalExponentialLogSuccessArray = [];
    let integrationSuccessArray = [];
    for await (const result of results) {
      exponentsData = [];
      derivativesData = [];
      trigonometricFunctionsData = [];
      naturalExponentialLogData = [];
      integrationData = [];
      // below is inside users loop
      if (result.progress) {
        if (result.progress.calculus) {
          if (result.progress.calculus.exponents) {
            exponentsData = result.progress.calculus.exponents.skillData;
          }
          if (result.progress.calculus.derivatives) {
            derivativesData = result.progress.calculus.derivatives.skillData;
          }
          if (result.progress.calculus.trigonometricFunctions) {
            trigonometricFunctionsData = result.progress.calculus.trigonometricFunctions.skillData;
          }
          if (result.progress.calculus.naturalExponentialLog) {
            naturalExponentialLogData = result.progress.calculus.naturalExponentialLog.skillData;
          }
          if (result.progress.calculus.integration) {
            integrationData = result.progress.calculus.integration.skillData;
          }                        
        }
      }
      userData = {};
      exponentsSuccessArray = [];
      derivativesSuccessArray = [];
      trigonometricFunctionsSuccessArray = [];
      naturalExponentialLogSuccessArray = [];
      integrationSuccessArray = [];
      user = '';
      let successCount = 0;
      if (exponentsData) {
        for (let i = 0; i < questionTopics.exponents.length; i++) {
          successCount = 0
          for (let j = 0; j < exponentsData.length; j++) {
            if (questionTopics.exponents[i].topicName == exponentsData[j].skill) {
              successCount = successCount + 1;
            }
          }
          exponentsSuccessArray.push(successCount);    
        }
      }
      if (derivativesData) {
      for (let i = 0; i < questionTopics.derivatives.length; i++) {
        successCount = 0
        for (let j = 0; j < derivativesData.length; j++) {
          if (questionTopics.derivatives[i].topicName == derivativesData[j].skill) {
            successCount = successCount + 1;
          }
        }
        derivativesSuccessArray.push(successCount);    
      }
      }
      if (trigonometricFunctionsData) {
      for (let i = 0; i < questionTopics.trigonometricFunctions.length; i++) {
        successCount = 0
        for (let j = 0; j < trigonometricFunctionsData.length; j++) {
          if (questionTopics.trigonometricFunctions[i].topicName == trigonometricFunctionsData[j].skill) {
            successCount = successCount + 1;
          }
        }
        trigonometricFunctionsSuccessArray.push(successCount);    
      }
      }
      if (naturalExponentialLogData) {
        for (let i = 0; i < questionTopics.naturalExponentialLog.length; i++) {
          successCount = 0
          for (let j = 0; j < naturalExponentialLogData.length; j++) {
            if (questionTopics.naturalExponentialLog[i].topicName == naturalExponentialLogData[j].skill) {
              successCount = successCount + 1;
            }
          }
          naturalExponentialLogSuccessArray.push(successCount);    
        }
      }
      if (integrationData) {
        for (let i = 0; i < questionTopics.integration.length; i++) {
          successCount = 0
          for (let j = 0; j < integrationData.length; j++) {
            if (questionTopics.integration[i].topicName == integrationData[j].skill) {
              successCount = successCount + 1;
            }
          }
          integrationSuccessArray.push(successCount);    
        }
      }           
      userData = {username:result.username, logins: result.loginCount, totalQuestions: result.totalQuestionsAttempted, exponentsSuccessArray: exponentsSuccessArray, derivativesSuccessArray: derivativesSuccessArray, trigonometricFunctionsSuccessArray: trigonometricFunctionsSuccessArray, naturalExponentialLogSuccessArray: naturalExponentialLogSuccessArray, integrationSuccessArray: integrationSuccessArray}
      usersData.push(userData);
    }
    response.json({questionTopics: questionTopics, usersData: usersData, exponents: exponentsData, derivatives: derivativesData, naturalExponentialLog: naturalExponentialLogData, integration: integrationData});
  } catch(error) {
    console.error("Error fetching progress:", error);
    response.json({questionTopics: null, usersData: null, exponents: null, derivatives: null, naturalExponentialLog: null, integration: null})
  }
});

module.exports = usersRoutes;
