var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require("express-session")
var session = require("express-session")
var passport = require("passport")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var user = require("./models/usermodel")
var createdUser = require("./routes/createuser")
const cores = require("cors")
const MongoDBStor = require('connect-mongodb-session')(session);
var connectDB = require("./models/mongodb")
var app = express();
app.use(cores())

const uri = "mongodb://ch:Dx1UdK4BFB8xazJd@ac-yis9rym-shard-00-00.u6xbqf1.mongodb.net:27017,ac-yis9rym-shard-00-01.u6xbqf1.mongodb.net:27017,ac-yis9rym-shard-00-02.u6xbqf1.mongodb.net:27017/ffood?ssl=true&replicaSet=atlas-13hypp-shard-0&authSource=admin&retryWrites=true&w=majority";


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const store = new MongoDBStor({
  uri: uri,
  collection: 'sessions'
});

// Catch session store errors
store.on('error', function(error) {
  console.error('Session store error:', error);
});

// Use express-session middleware with MongoDBStore
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Establish database connection by calling the connectDB function from the db.js module
connectDB(uri);


app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/",createdUser)
app.use("/api",require("./routes/DisplayData"))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
