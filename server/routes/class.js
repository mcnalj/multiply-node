var express = require('express');
var classRoutes = express.Router();
const dbo = require("../db/conn");

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next()}
  res.json({msg: "Not authenticated. Redirect to login.", authenticated: false});
}

classRoutes.route('/').get(function(req, res, next) {
    res.send('respond with a resource');
});

classRoutes.route("/create-expedition").post(checkAuthenticated, async function (req, res) {
    const { expeditionName, expeditionDescription, classCode} = req.body;
    const classToUpdate = await dbo.client.db("employees")
           .collection("classes")
           .findOne({classCode: classCode});
    if (!classToUpdate) {
      return res.json({msg: 'Sorry, the class you are attemption to modify does not exist.', updatedId: "", success: false});
    }
    try {
      const expeditionRecord = await dbo.client.db("employees")
            .collection("classes").updateOne({_id: classToUpdate._id}, {$set: {
                expeditionName: expeditionName, expeditionDescription: expeditionDescription
            }});
      return res.json({msg: 'Success! Your expedition was created.', updatedId: expeditionRecord.upsertedId, success: true})      
    } catch(error) {
      console.error('Error creating instructional class:', error);
      return res.json({msg: 'Sorry, there was an error creating that class', updatedId: "", success: false})
    }
})

classRoutes.route("/join-class").post(checkAuthenticated, async function (req, res) {
    let msg = "";
    const {classCode} = req.body;
    const username = req.session.passport.user.username;
    // first we have to check if the class exists. Currently it will add a nonsense class code.
    // If it exists, we have to add to its members array.
    // Next we have to allow students to list classes. Now list-classes is only for teachers.
    try {
        const updateSuccess = await dbo.client.db("employees")
        .collection("users").updateOne({username: username}, {$addToSet: {classMemberships: classCode}});
        if (updateSuccess.matchedCount === 1) {
            if (updateSuccess.modifiedCount === 0) {
                msg = "You were already a member of this class.";
            } else {
                msg = "Success! You were added to the class.";
            }
        }
        return res.json({msg: msg, success: true})      
    } catch(error) {
        console.error('Error adding class membership:', error);
        return res.json({msg: 'Sorry, there was an error creating that class', success: false});
    }
})

classRoutes.route("/view-class").post(checkAuthenticated, async function (req, res) {
    msg = "";
    success = false;
    const {classCode} = req.body;
    const username = req.session.passport.user.username;
    try {
        const classInfo = await dbo.client.db("employees")
            .collection("classes")
            .findOne({classCode:classCode})
        if (classInfo) {
            msg = "found data!";
            success = true;
        }
        res.json({msg: msg, classInfo: classInfo, success: success});
    } catch(error) {
        console.error('Error finding instructional class:', error);
        return res.json({msg: 'Sorry, there was an error retrieving that class', classInfo: "", success: false})
    }
});

module.exports = classRoutes;
 