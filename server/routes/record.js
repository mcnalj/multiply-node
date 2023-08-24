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
    console.log(data.quoteResponse)
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
    console.log(response.data)
    res.json(response.data.quoteResponse);
  } catch (e) {
    console.error(e);
    return e.message
  }
  
});

recordRoutes.route("/listUsers").get(checkAuthenticated, async function (req, response) {
  console.log("got to the Users route");
  // need to switch to the employees db
  
  let projection = { _id: false, firstName: true, lastName: true, username: true}
  let results =  await dbo.client.db("employees")
    .collection("users")
    .find({}, projection);
  let usersArray = await results.toArray();
  console.log("Here is users array: ");
  console.log(usersArray); 
  response.json(usersArray);
});

recordRoutes.route("/fetch").get(checkAuthenticated, async function (req, response) {
  console.log("got to the record route");
  // let db_connect = dbo.getDb();
  let myQuery = {unitName: "derivatives"};
  console.log(myQuery);
  let projection = { _id: false, unitTopics: true}
  let results =  await dbo.client.db("calculus")
    .collection("units")
    .findOne(myQuery, projection, function (err, res) {
      if (err) throw err;
      console.log(res);
      response.json(res);
  });
  console.log("Here come results: ") 
  console.log(results);
  response.json(results);
});

recordRoutes.route('record/add').post(checkAuthenticated, function(req, response) {
    console.log("It made the add call with post in Record, including record");
  res.send('respond with a resource');

});

recordRoutes.route('record/add').get(checkAuthenticated, function(req, response) {
    console.log("It made the add call with get in Record including record");
  res.send('respond with a resource');

});

recordRoutes.route('/add').post(checkAuthenticated, function(req, response) {
    console.log("It made the add call with post, no record");

    console.log("got to the route");
    let db_connect = dbo.getDb();
    let myQuery = {unitName: "derivatives"};
    console.log(myQuery);
    let projection = { _id: false, unitTopics: true}
    db_connect.collection("units")
      .findOne(myQuery, projection, function (err, res) {
        if (err) throw err;
        console.log(res);
        response.json(res);
    });

  res.send('respond with a resource');
});

recordRoutes.route('/add').get(checkAuthenticated, async function(req, response) {
    console.log("It made the add call with get, no record");

    // console.log("got to the route");
    // // let db_connect = dbo.getDb();
    // let db_connect = await dbo.client.db("calculus");
    // let myQuery = {unitName: "derivatives"};
    // let projection = { _id: false, unitTopics: true}
    // await db_connect.collection("units")
    //   .findOne(myQuery, projection, function (err, res) {
    //     if (err) throw err;
    //     console.log(res);
    //     response.json(res);
    // });

    var rough = dbo.client.db("calculus").collection("units").findOne({unitName: "derivatives"});
    console.log(rough);
    console.log("here comes rough:")
    response.json(rough);
    // var rough = dbo.client.db("calculus").collection("units").findOne({unitName: "derivatives"})
    //   .then((response)=> {return response});
    // console.log(rough) // this logs a pending promise
    // console.log("here comes rough:")
    // response.json(rough);
});

recordRoutes.route("/navLogout").post( checkAuthenticated, function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.error("Error during logout:", err);
      res.status(500).json({error: "Logout failed"});
      return;
    }
  
    res.clearCookie("username");

    res.json({msg: "Logout was successful"});
  });    
});


recordRoutes.route("/loginPassport").post(function(req, res) {
  console.log("Made it to the Passport POST");
  // does this create a new user? bc I can log in a non-sense user
  req.login(req.body, function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log("This is the cookie from req");
      console.log(req.cookies);
      console.log("This is req.session from loginPassport")
      console.log(req.session);
      const passportData = req.session.passport.user;
      console.log(passportData);
      // Now we're setting this cookie on the front end 
      // res.cookie('username', 'MackTheNice');
      // return res.json({passportData});
      // what is the diff between return and no return?
      res.json({passportData});
      //return res.redirect('success');
    }
  })
});

//I'm not using these, I'm using loginPassport. I don't think it's using passport so how is it getting on the Session?
recordRoutes.route("/login-user").get(function(req, res) {
  console.log("This is the login-user get. We get here from failureRedirect");
  console.log("This is req.user: " + req.user);
  console.dir(req.user);
  res.json({msg: "Not logged in."});
});

recordRoutes.route("/login-user").post(passport.authenticate('local', {
  successRedirect: 'success',
  failureRedirect: 'login-user'
}));


recordRoutes.route("/record/myLogin").get(function(req, res){
  console.log("Got to the new route.");
})

// this handles the redirect on successful creation of a user.
recordRoutes.route("/success").get(function(req, res) {
  //                res.json( {msg: values.msg, success: values.success, userId: answer.insertedId} )
  console.log("We are in the 'success' route on the server. Maybe we cant to set a cookie?");
  console.dir(req.user);
  req.session.dude = "McKenroe";
  console.log("Here is the request session variable: ");
  console.log(req.session);
  const passportUser = req.session.passport.user.username;
  console.log(passportUser);

  // This has "dude" but not "passport" on the session variable
 
  
    res.json({msg: "Yippee! Logged in!", success: true, username:passportUser});
    //res.json({msg: "Yippee! Logged in!", success: true});  // This is what gets sent to the page we redirected from. Is there way to send meaningful info?
    // It seems like there is, that message shows up on the client and I imaging we can access the session variable.
    // return username here and set a cookie 
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
  console.log("This is the password: " + password);
  let userRecord = await dbo.client.db("employees")
    .collection("users")
    .findOne({username: username});
    let message = "";
    if (!userRecord) {
        message = "Username/password combination does not exist.";
        console.log(message);
        return cb(null, false, {message: message});

    } else {
      console.dir(userRecord);
      bcrypt.compare(password, userRecord.password, async function(err, result) {
        if (result) {
        message = "Success, logged in!"
        console.log(message);
        console.dir(userRecord);
        let userData = await dbo.client.db("employees")
        .collection("userData")
        .findOne({username: username});

        let updateSuccess = await dbo.client.db("employees")
        .collection("userData")
        .updateOne({username: username}, {$inc: {loginCount: 1}, $set:{lastLogin: userData.currentLoginTime, currentLoginTime: new Date()}});

        return cb(null, userRecord);
        } else {
        message = "Authentication failed";
        console.log("this is from authentication failed " + message);
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
    const { firstName, lastName, email, username, password} = req.body;
    const existingUser = await dbo.client.db("employees")
           .collection("users")
           .findOne({username: username});
    if (existingUser) {
      console.log("username already exists");
      console.log(username);
      return res.json({msg: 'Username already exists'});
    }
    try {
      console.dir(req.body);
      const hashedPassword = await bcrypt.hash(password, 8)
      const userRecord = await dbo.client.db("employees")
            .collection("users").insertOne(
              {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: hashedPassword,
              });        
      console.log("This is after insertOne: ");
      console.dir(userRecord);
      const passportId = userRecord.insertedId.toString()
      // const passportUser = {
      //   id: userRecord.insertedId.toString(),
      //   username: username,
      // }
      // console.log("This is passportUser");
      // console.dir(passportUser);

      let userDataObj = {
        username: username,
        joinedDate: new Date(),
        loginCount: 0,
        lastLogin: 0,
        currentLoginTime: 0,
        totalQuestionsAttempted: 0,
        totalQuestionsCorrect: 0,
      }
      let userSession = await dbo.client.db("employees")
      .collection("userData")
      .insertOne(userDataObj);
      console.log(userSession);

      console.log("We are about to try login.")
      
      console.log("This is passportId")
      console.log(passportId)
      req.login({_id:passportId, username:username},async function(err) {
        if (err) {
          console.error(err);
          res.redirect("login-user");
        } else {
          console.log("We are in the login success.");
          const passportData = req.session.passport.user;
          console.log(passportData);

          let updateSuccess = await dbo.client.db("employees")
          .collection("userData")
          .updateOne({username: username}, {$set:{currentLoginTime: new Date(), loginCount: 1}});
    
          
          res.json({passportData});
          //res.redirect("success"); // this looks for a route on the server
        }
      })  
    } catch {
      console.log("There was an error on hashing or insertion.");
      res.redirect("login-user");
    }
    // Insert session variable here?
    
//  res.json( {msg: values.msg, success: values.success, userId: answer.insertedId} )    
  })


// recordRoutes.route("/new-user").post(async function (req, res) {
//   try {
//     let userRecord = await dbo.client.db("employees")
//       .collection("users")
//       .findOne({username: req.body.username});
//     let success = false;
//     if (userRecord) {
//       console.log("Got a matching record: ");
//       console.log(userRecord);
//       msg = "Sorry, that username has been taken";
//       // We could just return from here.
//     } else {
//       success = true;
//       msg = "You're in luck. That username is available."
//       console.log(msg);
//     }
//     let values = {msg: msg, success: success}  
//     if (values.success) {
//       console.log("We are about to insertOne.")
//       console.dir(req.body.username);
//       bcrypt.hash(req.body.password, 8).then(function(hash) {
      //   try {
      //     userRecord = await dbo.client.db("employees")
      //       .collection("users").insertOne(
      //         {
      //           firstName: req.body.firstName,
      //           lastName: req.body.lastName,
      //           email: req.body.email,
      //           username: req.body.username,
      //           password: hash,
      //         });        
      //     console.log("This is after insertOne: " + userRecord);

      //     req.login(req.body, function(err) {
      //       if (err) {
      //         console.error(err);
      //       } else {
      //         const passportData = req.session.passport.user;
      //         console.log(passportData);
      //         // res.json({passportData});
      //       }
      //     })
      //     // Insert session variable here?
      //     res.redirect("success"); // this looks for a route on the server
      // //  res.json( {msg: values.msg, success: values.success, userId: answer.insertedId} )    
      //   } catch(err) {
      //     console.log("There was an error on insertion.");
      //     console.error(err);
      //     // I'm getting this message even though there is no error.
      //     // We need to return something here.
      //   }
//       });

//     //   let hash = bcrypt.hashSync(req.body.password, 8); // should I await this?
//     //   try {
//     //     userRecord = await dbo.client.db("employees")
//     //       .collection("users").insertOne(
//     //         {
//     //           firstName: req.body.firstName,
//     //           lastName: req.body.lastName,
//     //           email: req.body.email,
//     //           username: req.body.username,
//     //           password: hash,
//     //         });        
//     //     console.log("This is after insertOne: " + userRecord);

//     //     req.login(req.body, function(err) {
//     //       if (err) {
//     //         console.error(err);
//     //       } else {
//     //         const passportData = req.session.passport.user;
//     //         console.log(passportData);
//     //         // res.json({passportData});
//     //       }
//     //     })
//     //     // Insert session variable here?
//     //     res.redirect("success"); // this looks for a route on the server
//     // //  res.json( {msg: values.msg, success: values.success, userId: answer.insertedId} )    
//     //   } catch(err) {
//     //     console.log("There was an error on insertion.");
//     //     console.error(err);
//     //     // I'm getting this message even though there is no error.
//     //     // We need to return something here.
//     //   }
//     } else {
//       // This should only be if username was not available. Is that true?
//       res.json( {msg: values.msg, success: values.success, insertedId: null} )
//     }
//   } catch {      
//     console.log("We got to the error block");
//     res.json( {msg: "There was an error.", success: false, insertedId: null} )
//   }
// }); 

// add sessionData to progress array when user meets a standard.
// recordRoutes.route('/metStandard').post(checkAuthenticated, async function(req, res) {
//   const sessionData = req.body;
//   let msg = '';
//   let success = false;
//   try {
//     let updateSuccess = await dbo.client.db("employees")
//     .collection("userData")
//     .updateOne(
//       {username: sessionData.userData.username},
//       {
//         $inc:{
//           totalQuestionsAttempted: sessionData.userData.questionsAttempted,
//           totalQuestionsCorrect: sessionData.userData.questionsCorrect
//         },
//         $addToSet: { "progress.calculus.exponents.simplePowers.sessionsData":
//                       sessionData.progress.calculus.exponents.simplePowers.sessionsData} 
//       },
//       // do we want upsert to be true?
//       {upsert: true}
//     );
//     if (updateSuccess.modifiedCount == 1) {
//       msg ='Data was added to the progress array.';
//     } else {
//       msg = 'No data was added to the progress array';
//     }
//     success = true;
//   } catch {
//     msg = 'Error on attempt to updateOne';
//   }
//   res.send({msg:msg, success: success});
// });

// This is untested. Is there a way to combine it with metStandard?
// IT DOESN'T SEEM TO RECORD IF THE USER JUST REGISTERED - NOT AUTHENTICATED??
// Does this work if there's not yet any skillData?
// This def worked for user: daytwo
recordRoutes.route('/metStandard/derivatives').post(checkAuthenticated, async function(req, res) {
  console.log("Made it to met standard derivatives.");
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
      // do we want upsert to be true?
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
  console.log("Made it to met standard plain (exponents).");
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
      // do we want upsert to be true?
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

// derivative routes
recordRoutes.route("/topic/:unitName").get(async function (req, response) {
  console.log("Got to the derivative route.");
  let projection = { _id: false, unitTopics: true}
  let myQuery = {unitName: req.params.unitName};
  let results =  await dbo.client.db("calculus")
    .collection("units")
    .findOne(myQuery, projection, function(err, res) {
      if (err) throw err;
        response.json(res)
  });
  console.log(results)
  response.json(results);
});


recordRoutes.route("/markdownRoute").get(async function(req, res, next) {
  console.log("Requesting markdown file from server");
  req.session.dude = "McKenroe";
  console.log("Here is the request session variable: ");
  console.log(req.session);
  const passportUser = req.session.passport.user.username;
  console.log(passportUser);

  const markdownFilePath = path.join(__dirname, '../public/markdown/newtonsLaw.md');

  fs.readFile(markdownFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading markdown file.')
    }
    res.send(data);
  })
});

module.exports = recordRoutes;



