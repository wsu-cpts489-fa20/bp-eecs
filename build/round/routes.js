"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _schema = require("./../user/schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.post('/:userId', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var status;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("in /rounds (POST) route with params = " + JSON.stringify(req.params) + " and body = " + JSON.stringify(req.body));

            if (!(!req.body.hasOwnProperty("courseId") || !req.body.hasOwnProperty("courseName") || !req.body.hasOwnProperty("description") || !req.body.hasOwnProperty("prerequisites"))) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send("POST request on /rounds formulated incorrectly." + "Body must contain all 4 required fields: course id, course name, description, and prerequisites"));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return _schema.User.updateOne({
              id: req.params.userId
            }, {
              $push: {
                rounds: req.body
              }
            });

          case 6:
            status = _context.sent;

            if (status.nModified != 1) {
              //Should never happen!
              res.status(400).send("Unexpected error occurred when adding round to" + " database. Round was not added.");
            } else {
              res.status(200).send("Round successfully added to database.");
            }

            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(400).send("Unexpected error occurred when adding round" + " to database: " + _context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); //READ round route: Returns all rounds associated
//with a given user in the users collection (GET)

router.get('/:userId', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var thisUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("in /rounds route (GET) with userId = " + JSON.stringify(req.params.userId));
            _context2.prev = 1;
            _context2.next = 4;
            return _schema.User.findOne({
              id: req.params.userId
            });

          case 4:
            thisUser = _context2.sent;

            if (thisUser) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).message("No user account with specified userId was found in database."));

          case 9:
            return _context2.abrupt("return", res.status(200).json(JSON.stringify(thisUser.rounds)));

          case 10:
            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            console.log();
            return _context2.abrupt("return", res.status(400).message("Unexpected error occurred when looking up user in database: " + _context2.t0));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()); //UPDATE round route: Updates a specific round
//for a given user in the users collection (PUT)

router.put('/:userId/:roundId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var validProps, bodyObj, bodyProp, status;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("in /rounds (PUT) route with params = " + JSON.stringify(req.params) + " and body = " + JSON.stringify(req.body));
            validProps = ['courseId', 'courseName', 'description', 'prerequisites'];
            bodyObj = _objectSpread({}, req.body);
            delete bodyObj._id; //Not needed for update

            delete bodyObj.SGS; //We'll compute this below in seconds.

            console.log("bodyObj =", bodyObj);
            _context3.t0 = regeneratorRuntime.keys(bodyObj);

          case 7:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 17;
              break;
            }

            bodyProp = _context3.t1.value;

            if (validProps.includes(bodyProp)) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", res.status(400).send("rounds/ PUT request formulated incorrectly." + "It includes " + bodyProp + ". However, only the following props are allowed: " + "'course id', 'course name', 'description', and 'prerequisites'"));

          case 13:
            bodyObj["rounds.$." + bodyProp] = bodyObj[bodyProp];
            delete bodyObj[bodyProp];

          case 15:
            _context3.next = 7;
            break;

          case 17:
            _context3.prev = 17;
            _context3.next = 20;
            return _schema.User.updateOne({
              "id": req.params.userId,
              "rounds._id": _mongoose["default"].Types.ObjectId(req.params.roundId)
            }, {
              "$set": bodyObj
            });

          case 20:
            status = _context3.sent;

            if (status.nModified != 1) {
              res.status(400).send("Unexpected error occurred when updating round in database. Round was not updated.");
            } else {
              res.status(200).send("Round successfully updated in database.");
            }

            _context3.next = 28;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t2 = _context3["catch"](17);
            console.log(_context3.t2);
            return _context3.abrupt("return", res.status(400).send("Unexpected error occurred when updating round in database: " + _context3.t2));

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[17, 24]]);
  }));

  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}()); //DELETE round route: Deletes a specific round
//for a given user in the users collection (DELETE)

router["delete"]('/:userId/:roundId', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var status;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("in /rounds (DELETE) route with params = " + JSON.stringify(req.params));
            _context4.prev = 1;
            _context4.next = 4;
            return _schema.User.updateOne({
              id: req.params.userId
            }, {
              $pull: {
                rounds: {
                  _id: _mongoose["default"].Types.ObjectId(req.params.roundId)
                }
              }
            });

          case 4:
            status = _context4.sent;

            if (status.nModified != 1) {
              //Should never happen!
              res.status(400).send("Unexpected error occurred when deleting round from database. Round was not deleted.");
            } else {
              res.status(200).send("Round successfully deleted from database.");
            }

            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(400).send("Unexpected error occurred when deleting round from database: " + _context4.t0));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;