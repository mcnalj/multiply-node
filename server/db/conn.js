const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: async function(callback) {
    console.log("I am getting this message.")
    var rough = await client.db("employees").collection("users").findOne({username: "mcnalj"});
    // console.log(rough)

    // var bust = await client.db("calculus").command({ ping: 1 });
    // console.log(bust)

    // console.log("I am getting this message.")
    // var rough = await client.db("calculus").collection("units").findOne({unitName: "derivatives"});
    // console.log(rough)

    // var bust = await client.db("calculus").command({ ping: 1 });
    // console.log(bust)


    // connectToServer: function(callback) {
  //   client.connect(function (err, db) {
  //       console.log("But not this message!")
  //     // Verify we got a good "db" object
  //     if (db)
  //     {
  //       _db = db.db("calculus");
  //       console.log("Successfully connected to MongoDB.");
  //     }
      
  //     return callback(err);
  //   });
  },
  getDb: function () {
    return _db;
  },
  client: client,
};


// const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// var _db;

// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         _db = db.db("employees");
//         console.log("Successfully connected to MongoDB.");
//       }
//       return callback(err);
//          });
//   },

//   getDb: function () {
//     return _db;
//   },
// };
