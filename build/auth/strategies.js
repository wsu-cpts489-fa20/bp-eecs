"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.local = exports.github = void 0;

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _config = require("../config");

var _schema = require("../user/schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var github = new _passportGithub["default"].Strategy({
  clientID: _config.GH_CLIENT_ID,
  clientSecret: _config.GH_CLIENT_SECRET,
  callbackURL: "".concat(_config.DEPLOY_URL, "/auth/github/callback")
},
/*#__PURE__*/
//The following function is called after user authenticates with github
function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accessToken, refreshToken, profile, done) {
    var userId, currentUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("User authenticated through GitHub! In passport callback."); //Our convention is to build userId from displayName and provider

            userId = "".concat(profile.username, "@").concat(profile.provider); //See if document with this unique userId exists in database

            _context.next = 4;
            return _schema.User.findOne({
              id: userId
            });

          case 4:
            currentUser = _context.sent;

            if (currentUser) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return new _schema.User({
              id: userId,
              displayName: profile.displayName,
              authStrategy: profile.provider,
              profilePicURL: profile.photos[0].value,
              rounds: []
            }).save();

          case 8:
            currentUser = _context.sent;

          case 9:
            return _context.abrupt("return", done(null, currentUser));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());
exports.github = github;
var local = new _passportLocal["default"].Strategy({
  passReqToCallback: true
},
/*#__PURE__*/
//Called when user is attempting to log in with local username and password.
//userId contains the email address entered into the form and password
//contains the password entered into the form.
function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, userId, password, done) {
    var thisUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _schema.User.findOne({
              id: userId
            });

          case 3:
            thisUser = _context2.sent;

            if (!thisUser) {
              _context2.next = 13;
              break;
            }

            if (!(thisUser.password === password)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", done(null, thisUser));

          case 9:
            req.authError = "The password is incorrect. Please try again or reset your password.";
            return _context2.abrupt("return", done(null, false));

          case 11:
            _context2.next = 15;
            break;

          case 13:
            //userId not found in DB
            req.authError = "There is no account with email ".concat(userId, ". Please try again.");
            return _context2.abrupt("return", done(null, false));

          case 15:
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", done(_context2.t0));

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 17]]);
  }));

  return function (_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}());
exports.local = local;