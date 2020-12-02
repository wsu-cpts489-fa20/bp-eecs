"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _schema = require("./schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router(); //READ user route: Retrieves the user with the specified userId from users collection (GET)


router.get('/:userId', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var thisUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("in /users route (GET) with userId = " + JSON.stringify(req.params.userId));
            _context.prev = 1;
            _context.next = 4;
            return _schema.User.findOne({
              id: req.params.userId
            });

          case 4:
            thisUser = _context.sent;

            if (thisUser) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(404).send("No user account with id " + req.params.userId + " was found in database."));

          case 9:
            return _context.abrupt("return", res.status(200).json(JSON.stringify(thisUser)));

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.log();
            return _context.abrupt("return", res.status(400).send("Unexpected error occurred when looking up user with id " + req.params.userId + " in database: " + _context.t0));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); //CREATE user route: Adds a new user account to the users collection (POST)

router.post('/:userId', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var thisUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("in /users route (POST) with params = " + JSON.stringify(req.params) + " and body = " + JSON.stringify(req.body));

            if (!(req.body === undefined || !req.body.hasOwnProperty("password") || !req.body.hasOwnProperty("admin") || !req.body.hasOwnProperty("displayName") || !req.body.hasOwnProperty("profilePicURL") || !req.body.hasOwnProperty("securityQuestion") || !req.body.hasOwnProperty("securityAnswer"))) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).send("/users POST request formulated incorrectly. " + "It must contain 'password','displayName','profilePicURL','securityQuestion' and 'securityAnswer fields in message body."));

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return _schema.User.findOne({
              id: req.params.userId
            });

          case 6:
            thisUser = _context2.sent;

            if (!thisUser) {
              _context2.next = 11;
              break;
            }

            //account already exists
            res.status(400).send("There is already an account with email '" + req.params.userId + "'.");
            _context2.next = 15;
            break;

          case 11:
            _context2.next = 13;
            return new _schema.User({
              id: req.params.userId,
              password: req.body.password,
              displayName: req.body.displayName,
              admin: req.body.admin,
              authStrategy: 'local',
              profilePicURL: req.body.profilePicURL,
              securityQuestion: req.body.securityQuestion,
              securityAnswer: req.body.securityAnswer,
              rounds: []
            }).save();

          case 13:
            thisUser = _context2.sent;
            return _context2.abrupt("return", res.status(201).send("New account for '" + req.params.userId + "' successfully created."));

          case 15:
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", res.status(400).send("Unexpected error occurred when adding or looking up user in database. " + _context2.t0));

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 17]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()); //UPDATE user route: Updates a new user account in the users collection (POST)

router.put('/:userId', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var validProps, bodyProp, status;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("in /users update route (PUT) with userId = " + JSON.stringify(req.params) + " and body = " + JSON.stringify(req.body));

            if (req.params.hasOwnProperty("userId")) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).send("users/ PUT request formulated incorrectly." + "It must contain 'userId' as parameter."));

          case 3:
            validProps = ['password', 'displayName', 'profilePicURL', 'securityQuestion', 'securityAnswer'];
            _context3.t0 = regeneratorRuntime.keys(req.body);

          case 5:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 11;
              break;
            }

            bodyProp = _context3.t1.value;

            if (validProps.includes(bodyProp)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(400).send("users/ PUT request formulated incorrectly." + "Only the following props are allowed in body: " + "'password', 'displayname', 'profilePicURL', 'securityQuestion', 'securityAnswer'"));

          case 9:
            _context3.next = 5;
            break;

          case 11:
            _context3.prev = 11;
            _context3.next = 14;
            return _schema.User.updateOne({
              id: req.params.userId
            }, {
              $set: req.body
            });

          case 14:
            status = _context3.sent;

            if (status.nModified != 1) {
              //account could not be found
              res.status(404).send("No user account " + req.params.userId + " exists. Account could not be updated.");
            } else {
              res.status(200).send("User account " + req.params.userId + " successfully updated.");
            }

            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t2 = _context3["catch"](11);
            res.status(400).send("Unexpected error occurred when updating user data in database: " + _context3.t2);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[11, 18]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}()); //DELETE user route: Deletes the document with the specified userId from users collection (DELETE)

router["delete"]('/:userId', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var status;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("in /users route (DELETE) with userId = " + JSON.stringify(req.params.userId));
            _context4.prev = 1;
            _context4.next = 4;
            return _schema.User.deleteOne({
              id: req.params.userId
            });

          case 4:
            status = _context4.sent;

            if (!(status.deletedCount != 1)) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(404).send("No user account " + req.params.userId + " was found. Account could not be deleted."));

          case 9:
            return _context4.abrupt("return", res.status(200).send("User account " + req.params.userId + " was successfully deleted."));

          case 10:
            _context4.next = 16;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            console.log();
            return _context4.abrupt("return", res.status(400).send("Unexpected error occurred when attempting to delete user account with id " + req.params.userId + ": " + _context4.t0));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 12]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;