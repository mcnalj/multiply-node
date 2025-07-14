var express = require('express');
var usersRoutes = express.Router();
const dbo = require("../db/conn");
const { ObjectId} = require('mongodb');

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

usersRoutes.route('/logout').post((req, res) => { 
  res.clearCookie('session_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:'Strict',
  });
  res.status(200).json({message: "Logged out successfully"});
});

usersRoutes.route('/fetchUsername').get(async function(req, res, next) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({error: "User ID is required"});
  }
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format"});
  }
  try {
    const user = await dbo.client.db("theCircus")
      .collection("ccUsers")
      .findOne({_id: userId })
      if (!user) {
        return res.status(404).json({ error: "User not found"});
      }
      res.json({username: user.username, avatar:user.avatar, userRoles: user.roles || {} });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({error: "Server error"});
  } 
});

usersRoutes.route('/getCurrentUser').get(checkAuthenticated, async function(req, res, next) {
  const { userId } = req.query;
  
  try {
    let user;
    
    if (userId) {
      // Get specific user by ID
      user = await dbo.client.db("theCircus")
        .collection("ccUsers")
        .findOne({_id: userId});
    } else {
      // Get current authenticated user from session
      const username = req.session.passport.user.username;
      user = await dbo.client.db("theCircus")
        .collection("ccUsers")
        .findOne({username: username});
    }
    
    if (!user) {
      return res.status(404).json({error: "User not found"});
    }
    
    res.json({
      username: user.username, 
      avatar: user.avatar, 
      userRoles: user.roles || {},
      given_name: user.given_name,
      family_name: user.family_name,
      classMemberships: user.classMemberships || []
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({error: "Server error"});
  } 
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

// These next two routes are the same, but one is for summerPrep and the other is for calculus
// Have chatGPT explain how to make them dynamic
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

usersRoutes.route("/getProgressDetails/calculus/:topic").post(async function (req, res) {
  const username = req.body.username;
  const skills = req.body.skills;
  const { topic } = req.params;

  if (!username || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({
      success:false,
      message: "Invalid request, Ensure 'username' and 'skills' are provided.",
    });
  }

  try {
    const pipeline = [
      {
        $match: {
          username: username,
          actionType: "skillCompleted",
          "details.topic": { $in: skills },
        },
      },
      {
        $group: {
          _id: "$details.topic",
          details: { $push: "$details" },
        },
      },
      {
        $project: {
          topic: "$_id",
          details: 1,
          _id: 0,
        }
      },
    ];

    const results = await dbo.client.db("theCircus")
      .collection("ccUserActions")
      .aggregate(pipeline).toArray();
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching documents found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Documents retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while querying the database.",
    });
  }
});

usersRoutes.route("/getProgressIntegrationTopics/calculus/:topic").post(async function (req, res) {
  // const username = req.body.username;
  const userId = req.body.userId;
  const skills = req.body.skills;
  const { topic } = req.params;

  // if (!username || !Array.isArray(skills) || skills.length === 0) {
    if (!userId || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({
      success:false,
      message: "Invalid request, Ensure 'userId' and 'skills' are provided.",
    });
  }

  try {
    const pipeline = [
      {
        $match: {
          // username: username,
          userId: userId,
          actionType: "skillCompleted",
          "details.topic": { $in: skills },
        },
      },
      {
        $group: {
          _id: "$details.topic",
          details: { $push: "$details" },
        },
      },
      {
        $project: {
          topic: "$_id",
          details: 1,
          _id: 0,
        }
      },
    ];

    const results = await dbo.client.db("theCircus")
      .collection("ccUserActions")
      .aggregate(pipeline).toArray(); 
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching documents found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Documents retrieved successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while querying the database.",
    });
  }
});

usersRoutes.route("/getSkillsCompleted/:section").post(async function (req, res) {
  // const username = req.body.username;
  const userId = req.body.userId;
  // const skills = req.body.skills;
  const unit = "exponents";
  const { section } = req.params;

  // if (!username || !Array.isArray(skills) || skills.length === 0) {
    // if (!userId || !Array.isArray(skills) || skills.length === 0) {
      if (!userId ) {
    return res.status(400).json({
      success:false,
      message: "Invalid request, Ensure 'userId' and 'skills' are provided.",
    });
  }

  try {
    const pipeline = [
      {
        $match: {
          userId: userId,
          actionType: "skillCompleted",
          "details.section": section,
          "details.unit": unit,
        },
      },
      {
        $group: {
          _id: "$details.topic",
          details: { $push: "$details" },
        },
      },
      {
        $project: {
          topic: "$_id",
          details: 1,
          _id: 0,
        }
      },
    ];

    const results = await dbo.client.db("theCircus")
      .collection("ccUserActions")
      .aggregate(pipeline).toArray(); 
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching documents found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Documents retrieved successfully",
      data: results,
    });
    console.dir(data);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while querying the database.",
    });
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
  .find({'classMemberships': {$in:['CALC24', 'CALC25']}})
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

usersRoutes.route("/usersCC").get(async function (req, response) {
  console.log("fetching users at route /usersCC");
  try {
    // const users = await dbo.client.db("theCircus")
    //   .collection("ccUsers")
    //   .find({}).toArray();

    const users = await dbo.client.db("theCircus")
    .collection("ccUsers")
    .aggregate([
      {
        $lookup: {
          from: "ccUserActions",
          localField: "_id",
          foreignField: "userId",
          as: "actions",
          pipeline: [
            { $sort: { timeStamp: -1 } }
          ]
        }
      }
    ])
    .toArray();

      return response.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    }); 
  }
});

usersRoutes.route('/fetchUserInfoById/:userId').get(async function(req, res, next) {
  
  const { userId } = req.params;
  console.log(userId)
  if (!userId) {
    return res.status(400).json({error: "User ID is required"});
  }
  try {
    const user = await dbo.client.db("theCircus")
      .collection("ccUsers")
      .findOne({_id: userId});
    if (!user) {
      return res.status(404).json({ error: "User not found"});
    }
    res.json({
      username: user.username, 
      given_name: user.given_name,
      family_name: user.family_name,
      classMemberships: user.classMemberships || [],
      avatar: user.avatar, 
      userRoles: user.roles || {} 
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({error: "Server error"});
  } 
});

usersRoutes.route('/getUserActions/:userId').get(async function(req, res, next) {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({error: "User ID is required"});
  }
  
  try {
    // Try to find actions using both string and ObjectId formats
    const actions = await dbo.client.db("theCircus")
      .collection("ccUserActions")
      .find({
        $or: [
          {userId: userId},                    // String format
          {userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null}  // ObjectId format
        ],
        actionType: "skillCompleted"
      })
      .sort({timeStamp: -1})
      .toArray();
    
    res.json({
      msg: 'User actions retrieved successfully',
      success: true,
      actions: actions
    });
  } catch (error) {
    console.error("Error fetching user actions:", error);
    res.status(500).json({error: "Server error"});
  }
});

module.exports = usersRoutes;
