"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./routers/auth"));

var _property = _interopRequireDefault(require("./routers/property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 8080;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'Welcome to PropertyPro-Lite'
  });
});
app.use('/api/v1/auth/', _auth["default"]);
app.use('/api/v1/property/', _property["default"]);
var server = app.listen(port);
console.log('app running on port ', port);
var _default = server;
exports["default"] = _default;
//# sourceMappingURL=server.js.map