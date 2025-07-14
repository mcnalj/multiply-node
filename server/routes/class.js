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

classRoutes.route("/info/:classCode").get(async function (req, res) {
    const { classCode } = req.params;
    try {
        // First, get the class information from employees.classes (ccClasses)
        const classInfo = await dbo.client.db("theCircus")
            .collection("ccClasses")
            .findOne({classCode: classCode});
        
        if (!classInfo) {
            return res.json({msg: 'Class not found', success: false});
        }
        
        // Get the members array (usernames) from the class
        const memberUsernames = classInfo.members || [];
        
        // Fetch user details from theCircus.ccUsers for each member
        const studentDetails = [];
        if (memberUsernames.length > 0) {
            const users = await dbo.client.db("theCircus")
                .collection("ccUsers")
                .find({username: {$in: memberUsernames}})
                .toArray();
            
            // Sort users by family_name (A to Z)
            users.sort((a, b) => {
                const familyNameA = (a.family_name || '').toLowerCase();
                const familyNameB = (b.family_name || '').toLowerCase();
                return familyNameA.localeCompare(familyNameB);
            });
            
            // Create array of student names in the format "given_name family_name"
            for (const user of users) {
                studentDetails.push({
                    username: user.username,
                    displayName: `${user.given_name} ${user.family_name}`
                });
            }
            
            // Handle any members not found in ccUsers
            for (const username of memberUsernames) {
                if (!users.find(u => u.username === username)) {
                    studentDetails.push({
                        username: username,
                        displayName: username
                    });
                }
            }
        }
        
        // Return class info with enriched student details
        res.json({
            msg: 'Class information retrieved successfully',
            success: true,
            classCode: classCode,
            className: classInfo.className,
            members: studentDetails
        });
        
    } catch(error) {
        console.error('Error fetching class information:', error);
        return res.json({msg: 'Sorry, there was an error retrieving that class', success: false});
    }
});

classRoutes.route("/progress/:classCode").get(async function (req, res) {
    const { classCode } = req.params;
    try {
        // First, get the class information from theCircus.ccClasses
        const classInfo = await dbo.client.db("theCircus")
            .collection("ccClasses")
            .findOne({classCode: classCode});
        
        if (!classInfo) {
            return res.json({msg: 'Class not found', success: false});
        }
        
        // Get the members array (usernames) from the class
        const memberUsernames = classInfo.members || [];
        
        if (memberUsernames.length === 0) {
            return res.json({
                msg: 'No students found in class',
                success: true,
                classCode: classCode,
                className: classInfo.className,
                studentProgress: []
            });
        }
        
        // Fetch user details from theCircus.ccUsers for each member
        const users = await dbo.client.db("theCircus")
            .collection("ccUsers")
            .find({username: {$in: memberUsernames}})
            .toArray();
        
        // Create a map of username to userId for lookup
        const userIdMap = {};
        const userObjectIds = [];
        users.forEach(user => {
            userIdMap[user.username] = user._id.toString();
            userObjectIds.push(user._id);
        });
        
        // Get all userIds for the class members (try both string and ObjectId formats)
        const userIds = Object.values(userIdMap);
        console.log("userIds: ", userIds)
        // Fetch all skillCompleted actions for these users
        const actions = await dbo.client.db("theCircus")
            .collection("ccUserActions")
            .find({
                $or: [
                    {userId: {$in: userIds}},
                    {userId: {$in: userObjectIds}}
                ],
                actionType: "skillCompleted"
            })
            .sort({timeStamp: -1})
            .toArray();
        
        console.log(`Fetched ${actions.length} actions for class ${classCode}`);
        // Process progress data for each student
        const studentProgressData = [];
        
        // Sort users by family_name (A to Z)
        users.sort((a, b) => {
            const familyNameA = (a.family_name || '').toLowerCase();
            const familyNameB = (b.family_name || '').toLowerCase();
            return familyNameA.localeCompare(familyNameB);
        });
        
        for (const user of users) {
            const userId = user._id.toString();
            const userObjectId = user._id;
            const userActions = actions.filter(action => 
                action.userId === userId || 
                action.userId?.toString() === userId ||
                action.userId === userObjectId
            );
            
            // Helper function to format date
            const formatDate = (timestamp) => {
                if (!timestamp) return '--';
                const date = new Date(timestamp);
                return date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
            };
            
            // Helper function to convert milliseconds to minutes
            const msToMinutes = (ms) => {
                return Math.round(ms / 1000 / 60);
            };
            
            // Helper function to calculate section stats
            const calculateSectionStats = (sectionActions) => {
                if (sectionActions.length === 0) {
                    return {
                        lastAction: '--',
                        totalActions: 0,
                        totalTime: 0
                    };
                }
                
                return {
                    lastAction: formatDate(sectionActions[0].timeStamp),
                    totalActions: sectionActions.length,
                    totalTime: msToMinutes(sectionActions.reduce((sum, action) => 
                        sum + (action.details?.totalTime || 0), 0))
                };
            };
            
            // Filter actions by section
            const summerPrepActions = userActions.filter(action => 
                action.details?.section === 'summerPrep');
            const derivativesActions = userActions.filter(action => 
                action.details?.section === 'calculus' && action.details?.unit === 'derivatives');
            const integralsActions = userActions.filter(action => 
                action.details?.section === 'calculus' && action.details?.unit === 'integrals');
            
            // Calculate totals
            const totals = calculateSectionStats(userActions);
            
            // Calculate section-specific stats
            const summerPrep = calculateSectionStats(summerPrepActions);
            const derivatives = calculateSectionStats(derivativesActions);
            const integrals = calculateSectionStats(integralsActions);
            
            studentProgressData.push({
                username: user.username,
                userId: userId,
                displayName: `${user.given_name} ${user.family_name}`,
                totals: totals,
                summerPrep: summerPrep,
                derivatives: derivatives,
                integrals: integrals
            });
        }
        
        // Handle any members not found in ccUsers
        for (const username of memberUsernames) {
            if (!users.find(u => u.username === username)) {
                studentProgressData.push({
                    username: username,
                    displayName: username,
                    totals: { lastAction: '--', totalActions: 0, totalTime: 0 },
                    summerPrep: { lastAction: '--', totalActions: 0, totalTime: 0 },
                    derivatives: { lastAction: '--', totalActions: 0, totalTime: 0 },
                    integrals: { lastAction: '--', totalActions: 0, totalTime: 0 }
                });
            }
        }
    
        // Return class info with progress data
        res.json({
            msg: 'Class progress data retrieved successfully',
            success: true,
            classCode: classCode,
            className: classInfo.className,
            studentProgress: studentProgressData
        });
        
    } catch(error) {
        console.error('Error fetching class progress data:', error);
        return res.json({msg: 'Sorry, there was an error retrieving class progress data', success: false});
    }
});

module.exports = classRoutes;
