var express = require('express');
var recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const { response } = require('../app');
const fetch = require('node-fetch');
const axios = require('axios');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'my_secret_key',
};

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next()}
  res.json({msg: "Not authenticated. Redirect to login.", authenticated: false});
}

recordRoutes.route("/getAPI").get(checkAuthenticated, async function (req, res) {
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
  } catch (e) {
    console.error(e);
    return e.message
  }
  res.json(data.quoteResponse);
});

recordRoutes.route("/getAPIAxios").get(checkAuthenticated, async function (req, res) {
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
    res.json(response.data.quoteResponse);
  } catch (e) {
    console.error(e);
    return e.message
  }
  
});

recordRoutes.route("/listUsers").get(checkAuthenticated, async function (req, response) {
  let projection = { _id: false, firstName: true, lastName: true, username: true}
  let results =  await dbo.client.db("employees")
    .collection("users")
    .find({}, projection);
  let usersArray = await results.toArray();
  response.json(usersArray);
});

recordRoutes.route("/fetch").get(checkAuthenticated, async function (req, response) {
  // let db_connect = dbo.getDb();
  let myQuery = {unitName: "derivatives"};
  let projection = { _id: false, unitTopics: true}
  let results =  await dbo.client.db("calculus")
    .collection("units")
    .findOne(myQuery, projection, function (err, res) {
      if (err) throw err;
      response.json(res);
  }); 
  response.json(results);
});


recordRoutes.route('/add').get(checkAuthenticated, async function(req, response) {
    var rough = dbo.client.db("calculus").collection("units").findOne({unitName: "derivatives"});
    response.json(rough);
});

recordRoutes.route("/navLogout").post( checkAuthenticated, function(req, res) {
  try {
    req.logout(function(err) {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({error: "Logout failed"});
      }
      res.clearCookie("username");
      res.json({msg: "Logout was successful"});
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({error: "Logout failed"});
  }    
});

// If I type in a non-sense user, it lets me in as undefined
recordRoutes.route("/loginPassport").post(function(req, res) {
  // does this create a new user? bc I can log in a non-sense user
  req.login(req.body, function(err) {
    if (err) {
      console.error(err);
    } else {
      const passportData = req.session.passport.user;
      // Now we're setting this cookie on the front end 
      // res.cookie('username', 'MackTheNice');
      // return res.json({passportData});
      // what is the diff between return and no return?
      res.json({passportData});
    }
  })
});

//I'm not using these, I'm using loginPassport. I don't think it's using passport so how is it getting on the Session?
recordRoutes.route("/login-user").get(function(req, res) {
  // console.log("This is the login-user get. We get here from failureRedirect");
  // console.log("This is req.user: " + req.user);
  // console.dir(req.user);
  res.json({msg: "Not logged in.", success: false});
});

recordRoutes.route("/login-user").post(passport.authenticate('local', {
  successRedirect: 'success',
  failureRedirect: 'login-user'
}));

// this handles the redirect on successful creation of a user.
recordRoutes.route("/success").get(function(req, res) {
  //                res.json( {msg: values.msg, success: values.success, userId: answer.insertedId} )
  req.session.dude = "McKenroe";
  // console.log("Here is the request session variable: ");
  // console.log(req.session);
  const passportUser = req.session.passport.user.username;
  // This has "dude" but not "passport" on the session variable
 
  
    res.json({msg: "Successfully logged in", success: true, username:passportUser});
});

// authentication routes
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user._id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// put this back to get back to good on the local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  let userRecord = await dbo.client.db("employees")
    .collection("users")
    .findOne({username: username});
    let message = "";
    if (!userRecord) {
        message = "Username/password combination does not exist.";
        return cb(null, false, {message: message});

    } else {
      bcrypt.compare(password, userRecord.password, async function(err, result) {
        if (result) {
        message = "Success, logged in!"
        let userData = await dbo.client.db("employees")
        .collection("userData")
        .findOne({username: username});

        let updateSuccess = await dbo.client.db("employees")
        .collection("userData")
        .updateOne({username: username}, {$inc: {loginCount: 1}, $set:{lastLogin: userData.currentLoginTime, currentLoginTime: new Date()}});

        return cb(null, userRecord);
        } else {
        message = "Authentication failed";
        return cb(null, false, {message: message});
        }
      });
    }
  }));
      
// go back to these two for the JWT strategy
// passport.use(
//   new JwtStrategy(jwtOptions, async function(jwtPayload, done) {
//     const username = jwtPayload.sub
//     let userRecord = await dbo.client.db("employees")
//     .collection("users")
//     .findOne({username: username});
//     if (userRecord) return done(null, user);
//     else return done(null, false);
//   })
// );

// recordRoutes.route("jwtLogin").post(async function (req, res) {
//   const {username, password} = req.body;
//   let userRecord = await dbo.client.db("employees")
//   .collection("users")
//   .findOne({username: username});
//   let message = "";
//   if (!userRecord) {
//       message = "Username/password combination does not exist.";
//       console.log(message);
//       return cb(null, false, {message: message});
//   } else {
//     console.dir(userRecord);
//     bcrypt.compare(password, userRecord.password, function(err, result) {
//       if (result) {
//       message = "Success, logged in!"
//       console.log(message);
//       console.dir(userRecord);
//       const token = jwt.sign({sub: user._id}, 'my_secret_key', {expiresIn: '1h'});
//       res.json({token:token});
//       } else {
//       message = "Authentication failed";
//       console.log("this is from authentication failed " + message);
//       res.json({message: message});
//       }
//     });
//   }
// });
  
  recordRoutes.route("/new-user").post(async function (req, res) {
    const { firstName, lastName, email, username, password, classCode, role} = req.body;
    const existingUser = await dbo.client.db("employees")
           .collection("users")
           .findOne({username: username});
    if (existingUser) {
      return res.json({msg: 'Username already exists', success:false});
    }
    try {
      const classInfo = await dbo.client.db("employees")
      .collection("classes")
      .findOne({classCode: classCode});
      if (!classInfo) {
        return res.json({msg: 'Sorry, I could not find that class code.', success:false});
      }
      const hashedPassword = await bcrypt.hash(password, 8)
      const userRecord = await dbo.client.db("employees")
            .collection("users").insertOne(
              {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: hashedPassword,
                role: "student",
                classMemberships: [classCode],
                classOwnerships: []
              });        
      const passportId = userRecord.insertedId.toString()
      // const passportUser = {
      //   id: userRecord.insertedId.toString(),
      //   username: username,
      // }

      let userDataObj = {
        username: username,
        joinedDate: new Date(),
        classMemberships: [classCode],
        loginCount: 0,
        lastLogin: 0,
        currentLoginTime: 0,
        totalQuestionsAttempted: 0,
        totalQuestionsCorrect: 0,
      }
      let userSession = await dbo.client.db("employees")
      .collection("userData")
      .insertOne(userDataObj);
      // check for errors inserting userSession
      let addToClass = await dbo.client.db("employees")
      .collection("classes")
      .updateOne({ classCode: classCode }, { $addToSet:{classMembers: username} })
      req.login({_id:passportId, username:username},async function(err) {
        if (err) {
          console.error(err);
          res.redirect("login-user"); //returns the msg "Not logged in." from login-user
        } else {
          const passportData = req.session.passport.user;
          let updateSuccess = await dbo.client.db("employees")
          .collection("userData")
          .updateOne({username: username}, {$set:{currentLoginTime: new Date(), loginCount: 1}});
    
          res.json({passportData, success: true});
          //res.redirect("success"); // this looks for a route on the server
        }
      })  
    } catch {
      // console.log("There was an error on hashing or insertion.");
      //res.redirect("login-user");
      res.json({msg: "Sorry, error creating user", success:false})
    }
  })

recordRoutes.route('/metStandard/derivatives').post(checkAuthenticated, async function(req, res) {
  const sessionData = req.body;
  let msg = '';
  let success = false;
  try {
    let updateSuccess = await dbo.client.db("employees")
    .collection("userData")
    .updateOne(
      {username: sessionData.userData.username},
      {
        $inc:{
          totalQuestionsAttempted: sessionData.userData.questionsAttempted,
          totalQuestionsCorrect: sessionData.userData.questionsCorrect
        },
        $addToSet: { "progress.calculus.derivatives.skillData":
                      sessionData.progress.calculus.derivatives.skillData
                    } 
      },
      {upsert: true}
    );
    if (updateSuccess.modifiedCount == 1) {
      msg ='Data was added to the progress array.';
    } else {
      msg = 'No data was added to the progress array';
    }
    success = true;
  } catch {
    msg = 'Error on attempt to updateOne';
  }
  res.send({msg:msg, success: success});
});

recordRoutes.route('/metStandard/trigonometricFunctions').post(checkAuthenticated, async function(req, res) {
  const sessionData = req.body;
  let msg = '';
  let success = false;
  try {
    let updateSuccess = await dbo.client.db("employees")
    .collection("userData")
    .updateOne(
      {username: sessionData.userData.username},
      {
        $inc:{
          totalQuestionsAttempted: sessionData.userData.questionsAttempted,
          totalQuestionsCorrect: sessionData.userData.questionsCorrect
        },
        $addToSet: { "progress.calculus.trigonometricFunctions.skillData":
                      sessionData.progress.calculus.trigonometricFunctions.skillData
                    } 
      },
      {upsert: true}
    );
    if (updateSuccess.modifiedCount == 1) {
      msg ='Data was added to the progress array.';
    } else {
      msg = 'No data was added to the progress array';
    }
    success = true;
  } catch {
    msg = 'Error on attempt to updateOne';
  }
  res.send({msg:msg, success: success});
});

recordRoutes.route('/metStandard/naturalExponentialLog').post(checkAuthenticated, async function(req, res) {
  const sessionData = req.body;
  let msg = '';
  let success = false;
  try {
    let updateSuccess = await dbo.client.db("employees")
    .collection("userData")
    .updateOne(
      {username: sessionData.userData.username},
      {
        $inc:{
          totalQuestionsAttempted: sessionData.userData.questionsAttempted,
          totalQuestionsCorrect: sessionData.userData.questionsCorrect
        },
        $addToSet: { "progress.calculus.naturalExponentialLog.skillData":
                      sessionData.progress.calculus.naturalExponentialLog.skillData
                    } 
      },
      {upsert: true}
    );
    if (updateSuccess.modifiedCount == 1) {
      msg ='Data was added to the progress array.';
    } else {
      msg = 'No data was added to the progress array';
    }
    success = true;
  } catch {
    msg = 'Error on attempt to updateOne';
  }
  res.send({msg:msg, success: success});
});

recordRoutes.route('/metStandard/integration').post(checkAuthenticated, async function(req, res) {
  const sessionData = req.body;
  let msg = '';
  let success = false;
  try {
    let updateSuccess = await dbo.client.db("employees")
    .collection("userData")
    .updateOne(
      {username: sessionData.userData.username},
      {
        $inc:{
          totalQuestionsAttempted: sessionData.userData.questionsAttempted,
          totalQuestionsCorrect: sessionData.userData.questionsCorrect
        },
        $addToSet: { "progress.calculus.integration.skillData":
                      sessionData.progress.calculus.integration.skillData
                    } 
      },
      {upsert: true}
    );
    if (updateSuccess.modifiedCount == 1) {
      msg ='Data was added to the progress array.';
    } else {
      msg = 'No data was added to the progress array';
    }
    success = true;
  } catch {
    msg = 'Error on attempt to updateOne';
  }
  res.send({msg:msg, success: success});
});


recordRoutes.route('/metStandard').post(checkAuthenticated, async function(req, res) {
  const sessionData = req.body;
  let msg = '';
  let success = false;
  try {
    let updateSuccess = await dbo.client.db("employees")
    .collection("userData")
    .updateOne(
      {username: sessionData.userData.username},
      {
        $inc:{
          totalQuestionsAttempted: sessionData.userData.questionsAttempted,
          totalQuestionsCorrect: sessionData.userData.questionsCorrect
        },
        $addToSet: { "progress.calculus.exponents.skillData":
                      sessionData.progress.calculus.exponents.skillData
                    } 
      },
      {upsert: true}
    );
    if (updateSuccess.modifiedCount == 1) {
      msg ='Data was added to the progress array.';
    } else {
      msg = 'No data was added to the progress array';
    }
    success = true;
  } catch {
    msg = 'Error on attempt to updateOne';
  }
  res.send({msg:msg, success: success});
});

// we should make the classTeacher always have to be the logged in user
recordRoutes.route("/create-class").post(checkAuthenticated, async function (req, res) {
  const { className, classDescription, classTeacher, classCode} = req.body;
  const creatingTeacher = await dbo.client.db("employees")
         .collection("users")
         .findOne({username: classTeacher});
  if (!creatingTeacher) {
    return res.json({msg: 'Sorry, the class teacher you submitted does not exist.', success: false});
  }
  try {
    const userRecord = await dbo.client.db("employees")
          .collection("classes").insertOne(
            {
              className: className,
              classDescription: classDescription,
              classTeacher: classTeacher,
              classCode: classCode,
              classMembers: []
            });
    return res.json({msg: 'Success! Your class was created.', success: true})      
  } catch(error) {
    console.error('Error creating instructional class:', error);
    return res.json({msg: 'Sorry, there was an error creating that class', success: false})
  }
})

// derivative routes
recordRoutes.route("/topic/:unitName").get(async function (req, response) {
  let projection = { _id: false, unitTopics: true}
  let myQuery = {unitName: req.params.unitName};
  let results =  await dbo.client.db("calculus")
    .collection("units")
    .findOne(myQuery, projection, function(err, res) {
      if (err) throw err;
        response.json(res)
  });
  response.json(results);
});

recordRoutes.route("/listClasses").post(async function (req, response) {
  // this attempt to set const user is what is breaking it. Why is this being called?
  // const user = req.session.passport.user.username;
  // let query = { classMembers: user};
  // try {
  //   let usersData = [];
  //   let results = dbo.client.db("employees")
  //     .collection("classes")
  //     .find(query)    
  //   for await (const result of results) {
  //     usersData.push(result);
  //   }
  //   console.log(usersData);
  //   response.json({usersData: usersData});
  // let query = { username: user};
  try {
    const user = req.session.passport.user.username;
    let query = { username: user};
    let usersData = [];
    let results = await dbo.client.db("employees")
      .collection("users")
      .findOne(query)
    usersData = results.classMemberships;      
    response.json({usersData: usersData});

  } catch(error) {
    console.error("Error fetching progress:", error);
    response.json({usersData: null})
  }
});

recordRoutes.route("/skillsCompleted").post(async function (req, response) {
  const user = req.session?.passport?.user?.username;
  if (!user) {
    response.json({completedSkillsArray: null})
    return
  }
  let query = { username: user };
  let options = {projection: { progress: 1 }};

  try {
    let completedSkillsArrayExponents = []
    let completedSkillsArrayDerivatives = [];
    let completedSkillsArrayTrigonometric = [];
    let completedSkillsArrayNatural = [];
    let completedSkillsArrayIntegration = [];
    let results = await dbo.client.db("employees")
      .collection("userData")
      .findOne(query, options)
    if (results.progress.calculus) {
      if (results.progress.calculus.exponents) {
        if (results.progress.calculus.exponents.skillData) {
          results.progress.calculus.exponents.skillData.forEach(element => {
            if (!completedSkillsArrayExponents.includes(element.skill)) {
              completedSkillsArrayExponents.push(element.skill);
            }
          })
        }
      }
      if (results.progress.calculus.derivatives) {
        if (results.progress.calculus.derivatives.skillData) {
          results.progress.calculus.derivatives.skillData.forEach(element => {
            if (!completedSkillsArrayDerivatives.includes(element.skill)) {
              completedSkillsArrayDerivatives.push(element.skill);
            }
          })
        }
      }
      if (results.progress.calculus.trigonometricFunctions) {
        if (results.progress.calculus.trigonometricFunctions.skillData) {
          results.progress.calculus.trigonometricFunctions.skillData.forEach(element => {
            if (!completedSkillsArrayTrigonometric.includes(element.skill)) {
              completedSkillsArrayTrigonometric.push(element.skill);
            }
          })
        }
      }
      if (results.progress.calculus.naturalExponentialLog) {
        if (results.progress.calculus.naturalExponentialLog.skillData) {
          results.progress.calculus.naturalExponentialLog.skillData.forEach(element => {
            if (!completedSkillsArrayNatural.includes(element.skill)) {
              completedSkillsArrayNatural.push(element.skill);
            }
          })
        } 
      }
      if (results.progress.calculus.integration) {   
        if (results.progress.calculus.integration.skillData) {
          results.progress.calculus.integration.skillData.forEach(element => {
            if (!completedSkillsArrayIntegration.includes(element.skill)) {
              completedSkillsArrayIntegration.push(element.skill);
            }
          })
        } 
      } 
    }  
    // usersDataDerivatives = results.progress.calculus.derivatives.skillData;
    // these need to account for no data exists
    // usersDataTrigonometricFunctions = results.progress.calculus.trigonometricFunctions.skillData    
    // usersDataNaturalExponentialLog = results.progress.calculus.naturalExponentialLog.skillData;
    // usersDataIntegration = results.progress.calculus.integration.skillData;
    // console.log(usersDataIntegration)
    // completedSkillsArrayExponents = []
    // completedSkillsArrayDerivatives = [];
    // completedSkillsArrayTrigonometric = [];
    // completedSkillsArrayNatural = [];
    // completedSkillsArrayIntegration = [];
    // usersDataDerivatives.forEach(element => {
    //   if (!completedSkillsArrayDerivatives.includes(element.skill)) {
    //     completedSkillsArrayDerivatives.push(element.skill);
    //   }
    // })
    // usersDataNaturalExponentialLog.forEach(element => {
    //   if (!completedSkillsArrayNatural.includes(element.skill)) {
    //     completedSkillsArrayNatural.push(element.skill);
    //   }
    // })
    // usersDataIntegration.forEach(element => {
    //   if (!completedSkillsArrayIntegration.includes(element.skill)) {
    //     completedSkillsArrayIntegration.push(element.skill);
    //   }
    // })             
    response.json({competedSkillsArrayExponents: completedSkillsArrayExponents, completedSkillsArrayDerivatives: completedSkillsArrayDerivatives, completedSkillsArrayTrigonometric: completedSkillsArrayTrigonometric, completedSkillsArrayNatural: completedSkillsArrayNatural, completedSkillsArrayIntegration: completedSkillsArrayIntegration });

  } catch(error) {
    console.error("Error fetching completed skills:", error);
    response.json({completedSkillsArrayExponents: null, completedSkillsArrayDerivatives: null, completedSkillsArrayTrigonometric:null, completedSkillsArrayNatural: null, completedSkillsArrayIntegration: null})
  }
});

recordRoutes.route('/finishedTutorial').post(checkAuthenticated, async function(req, res) {
  const progressData = req.body;
  let msg = '';
  let success = false;
  try {
    let updateSuccess = await dbo.client.db("employees")
    .collection("userData")
    .updateOne(
      {username: progressData.userData.username},
      {
        $addToSet: { "progress.calculus.tutorials.tutorialData":
                       progressData.progress.calculus.tutorials.tutorialData
                   } 
      },
      {upsert: true}
    );
    if (updateSuccess.modifiedCount == 1) {
      msg ='Data was added to the progress array.';
    } else {
      msg = 'No data was added to the progress array';
    }
    success = true;
  } catch {
    msg = 'Error on attempt to updateOne';
  }
  res.send({msg:msg, success: success});
});

recordRoutes.route('/saveProgressUpdate').post(checkAuthenticated, async function(req, res) {
  console.log("got to route");
  const updateData = req.body;
  let msg = '';
  let success = false;
  try {
    let updateSuccess = await dbo.client.db("employees")
    .collection("userData")
    .updateOne(
      {username: updateData.userData.username},
      {
        $set: { "progress.standards.derivatives":
                      updateData.progress.standards.derivatives
                    } 
      },
      {upsert: true}
    );
    if (updateSuccess.modifiedCount == 1) {
      msg =`${updateSuccess.matchedCount} documents(s) was updated.`;
    } else {
      msg = 'Something is off. No data was added.';
    }
    success = true;
  } catch {
    msg = 'Error on attempt to updateOne';
  }
  res.send({msg:msg, success: success});
});

recordRoutes.route("/getStandardsProgress").post(async function (req, response) {
  const user = req.session?.passport?.user?.username;
  if (!user) {
    response.json({progressObj: null})
    return
  }
  let query = { username: user };
  let options = {projection: { progress: 1 }};

  try {
    let results = await dbo.client.db("employees")
      .collection("userData")
      .findOne(query, options)
    if (results.progress) {
      if (results.progress.standards) {
        if (results.progress.standards.derivatives) {
          if (results.progress.standards.derivatives.derivativesRules) {
            progressObj = results.progress.standards.derivatives.derivativesRules;
          }
        }
      }
    }              
    response.json({progressObj: progressObj});

  } catch(error) {
    console.error("Error fetching standards progress:", error);
    response.json({progressObj: null})
  }
});




module.exports = recordRoutes;



