"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserialize = exports.serialize = exports.userSchema = exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _schema = require("../round/schema");

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Define schema that maps to a document in the Users collection in the appdb
//database.
var userSchema = new _mongoose["default"].Schema({
  id: String,
  //unique identifier for user
  password: String,
  admin: Boolean,
  displayName: String,
  //Name to be displayed within app
  authStrategy: String,
  //strategy used to authenticate, e.g., github, local
  profilePicURL: String,
  //link to profile image
  securityQuestion: String,
  securityAnswer: {
    type: String,
    required: function required() {
      return !!this.securityQuestion;
    }
  },
  rounds: [_schema.roundSchema]
});
exports.userSchema = userSchema;

var User = _mongoose["default"].model("User", userSchema);

exports.User = User;

var serialize = function serialize(user, done) {
  console.log("In serializeUser.");
  console.log("Contents of user param: " + JSON.stringify(user));
  done(null, user.id);
};

exports.serialize = serialize;

var deserialize = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee(userId, done) {
    var thisUser;
    return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("In deserializeUser.");
            console.log("Contents of userId param: " + userId);
            _context.prev = 2;
            _context.next = 5;
            return User.findOne({
              id: userId
            });

          case 5:
            thisUser = _context.sent;
            console.log("User with id " + userId + " found in DB. User object will be available in server routes as req.user.");
            done(null, thisUser);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            done(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function deserialize(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.deserialize = deserialize;