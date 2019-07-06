"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/signup', _user["default"].signUp);
router.post('/signin', _user["default"].login);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map