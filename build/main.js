"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _strategies = require("./auth/strategies");

var _config = require("./config");

var _schema = require("./user/schema");

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
_mongoose["default"].connect(_config.MONGO_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Connected to ".concat(_config.MONGO_STR, "."));
}, function (err) {
  console.error("Error connecting to ".concat(_config.MONGO_STR, ": ").concat(err));
}); //////////////////////////////////////////////////////////////////////////
//PASSPORT SET-UP
//The following code sets up the app with OAuth authentication using
//the 'github' strategy in passport.js.
//////////////////////////////////////////////////////////////////////////


for (var _i = 0, _arr = [_strategies.local, _strategies.github]; _i < _arr.length; _i++) {
  var strategy = _arr[_i];

  _passport["default"].use(strategy);
}

_passport["default"].serializeUser(_schema.serialize);

_passport["default"].deserializeUser(_schema.deserialize); //////////////////////////////////////////////////////////////////////////
//INITIALIZE EXPRESS APP
// The following code uses express.static to serve the React app defined 
//in the client/ directory at PORT. It also writes an express session
//to a cookie, and initializes a passport object to support OAuth.
/////////////////////////////////////////////////////////////////////////


var app = (0, _express["default"])();
app.use((0, _expressSession["default"])({
  secret: "speedgolf",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60
  }
})).use(_express["default"]["static"](_config.CLIENT_PATH)).use(_passport["default"].initialize()).use(_passport["default"].session()).use(_express["default"].json({
  limit: '20mb'
})).use('/', _router["default"]).listen(_config.PORT, function () {
  return console.log("Listening on ".concat(_config.PORT));
});