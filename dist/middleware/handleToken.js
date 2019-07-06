"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

var _Feedback = require("../helpers/Feedback");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateToken = function generateToken(user) {
  return _jsonwebtoken["default"].sign({
    user: user
  }, 'secret', {
    expiresIn: '7d'
  });
};

exports.generateToken = generateToken;

var checkToken = function checkToken(req, res, next) {
  try {
    var header = req.headers.authorization;

    if (!header) {
      return _Feedback.authFeedback.apply(void 0, [res, 403].concat(['status', 'error', 'data', {
        'message': 'Token must be provided'
      }]));
    }

    var bearer = header.split(' ');
    var token = bearer[1];

    var decoded = _jsonwebtoken["default"].verify({
      token: token
    }, 'secret', {
      expiresIn: '7d'
    });

    if (!decoded) {
      return _Feedback.authFeedback.apply(void 0, [res, 403].concat(['status', 'error', 'data', {
        'message': 'Unable to authenticate token'
      }]));
    }

    req.tokenData = decoded;
    return next();
  } catch (err) {
    return _Feedback.authFeedback.apply(void 0, [res, 403].concat(['status', 'error', 'data', {
      'message': 'Authentication failed'
    }]));
  }
};

exports.checkToken = checkToken;
//# sourceMappingURL=handleToken.js.map