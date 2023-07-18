const express = require('express');
const app = express();
const passport = require('passport');

//next 4 added for JWT strategy
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const jwt = require('jsonwebtoken');
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'my_secret_key',
// };
//const redis = require('redis');
const session = require('express-session');

const { credentials } = require('./configuration');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const path = require('path');

const MongoStore = require('connect-mongo');

app.use(function(req, res, next) {
  // this is required becuase it can't be * when using include.
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // This is required when credentials: include
  res.header("Access-Control-Allow-Credentials", true);
  next();
})

app.use(cors({origin: "http://localhost:3000"}));
app.use(cookieParser(credentials.cookieSecret));
//app.use(cookieParser());

require('dotenv').config({path: './config.env'});

const port = process.env.PORT || 5000;

app.use(session({
  store: new MongoStore({
    mongoUrl: "mongodb+srv://mcnalj:tec0L0te@cluster0.duafm.mongodb.net/?retryWrites=true&w=majority",
    ttl: 14 * 24 * 60 *60,
    autoRemove: 'native'
  }),
  secret: credentials.cookieSecret,
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //     secure: false, // if true only transmit cookie over https
  //     httpOnly: false, // if true prevent client side JS from reading the cookie
  //     maxAge: 1000 * 60 * 10 // session max age in miliseconds
  // }
}))

app.use(passport.authenticate('session'));

app.use(express.json());

const dbo = require("./db/conn");

const logger = require('morgan');
const http = require('http');

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { MongoClient } = require('mongodb');

// const RedisStore = connectRedis(session)


// const uri = "mongodb+srv://mcnalj:tec0L0te@cluster0.duafm.mongodb.net/?retryWrites=true&w=majority";
// const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
// const client = new MongoClient(uri);

// app.use(function(req, res, next) {
//   // this is required becuase it can't be * when using include.
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   // This is required when credentials: include
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// })

// // it works without cors, but is I include it, I have to override the origin default from * for cookies to work.
// app.use(cors({origin: "http://localhost:3000"}));
// // app.use(cookieParser(credentials.cookieSecret));


// app.get('/record/fetch', (req, res)=> {
//   console.log("Got here");
//   res.json(
//       { "id": 1, "name": "Apples",  "price": "$2" })
// })

// //view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser()); // deleted during login
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const routesRecord = require('./routes/record');
const quizRouter = require('./routes/quiz');
// const { ExtractJwt } = require('passport-jwt');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/record', routesRecord);
app.use('/quiz', quizRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



// async function listDatabases(client) {
//   databasesList = await client.db().admin().listDatabases();
//   console.log("Databases");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// }


// async function makeConnection() {
//   // const uri = "mongodb+srv://mcnalj:tec0L0te@cluster0.duafm.mongodb.net/?retryWrites=true&w=majority";
//   // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//   try {
//     await client.connect();

//     await client.db().command({ ping: 1 });

//     await client.db("calculus").collection("units").findOne({unitName: "derivatives"}, { _id: false, unitTopics: true}, function(err, res) {
//       console.log(err);
//       console.log(res);
//     })

//     await listDatabases(client);

//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close()
//   }
// }

// const collection = client.db("calculus").collection("topicSessions");


// var _db;

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
 // makeConnection().catch(console.error);
  console.log(`Server is running on port ${port}`);

});

module.exports = app;
