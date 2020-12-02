"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLIENT_PATH = exports.GH_CLIENT_SECRET = exports.GH_CLIENT_ID = exports.MONGO_STR = exports.PORT = exports.DEPLOY_URL = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var LOCAL_PORT = 8080;
var DEPLOY_URL = process.env.PUBLIC_URL || "https://eecsdegree.bfapp.org/";
exports.DEPLOY_URL = DEPLOY_URL;
var PORT = process.env.HTTP_PORT || LOCAL_PORT;
exports.PORT = PORT;
var MONGO_STR = process.env.MONGO_STR;
exports.MONGO_STR = MONGO_STR;
var GH_CLIENT_ID = process.env.GH_CLIENT_ID;
exports.GH_CLIENT_ID = GH_CLIENT_ID;
var GH_CLIENT_SECRET = process.env.GH_CLIENT_SECRET;
exports.GH_CLIENT_SECRET = GH_CLIENT_SECRET;

var CLIENT_PATH = _path["default"].join(__dirname, '..', 'client', 'build'); // Check that options are set, and provide a more helpful error message if they're not.


exports.CLIENT_PATH = CLIENT_PATH;
var options = {
  MONGO_STR: MONGO_STR,
  GH_CLIENT_ID: GH_CLIENT_ID,
  GH_CLIENT_SECRET: GH_CLIENT_SECRET
};

for (var option in options) {
  if (options[option] === undefined) {
    throw new Error("Environment variable \"".concat(option, "\" is undefined! Make sure that your environment provides the proper variables."));
  }
}