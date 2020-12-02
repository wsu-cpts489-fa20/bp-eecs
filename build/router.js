"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./auth/routes"));

var _routes2 = _interopRequireDefault(require("./user/routes"));

var _routes3 = _interopRequireDefault(require("./round/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/auth', _routes["default"]).use('/users', _routes2["default"]).use('/rounds', _routes3["default"]);
var _default = router;
exports["default"] = _default;