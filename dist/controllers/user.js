"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _Feedback = require("../helpers/Feedback");

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _handleToken = require("../middleware/handleToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = {
  signUp: function signUp(req, res) {
    if (!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.password && !req.body.address && !req.body.phoneNumber) {
      return res.status(400).send({
        'message': 'Please Fill all fields'
      });
    }

    var allUserList = _user["default"].AllUsers();

    var Index = allUserList.findIndex(function (u) {
      return u.email === req.body.email;
    });

    if (Index >= 0) {
      return _Feedback.serverFeedback.apply(void 0, [res, 403].concat(['status', 'error', 'data', {
        'message': 'User already exist'
      }]));
    }

    var User = _user["default"].signUp(req.body);

    return res.status(201).json({
      status: "success",
      data: User
    });
  },
  login: function login(req, res) {
    try {
      var _req$body = req.body,
          password = _req$body.password,
          email = _req$body.email;

      var allUserList = _user["default"].AllUsers();

      var displayUser = allUserList.find(function (u) {
        return u.email === email;
      });

      if (!displayUser) {
        return _Feedback.serverFeedback.apply(void 0, [res, 403].concat(['status', 'error', 'data', {
          'message': 'Invalid email'
        }]));
      }

      var decryptedPassword = _auth["default"].comparePassword(displayUser.password, password);

      if (!decryptedPassword) {
        return _Feedback.serverFeedback.apply(void 0, [res, 422].concat(['status', 'error', 'data', {
          'message': 'Incorrect Password'
        }]));
      }

      var id = displayUser.id,
          phoneNumber = displayUser.phoneNumber,
          first_name = displayUser.first_name,
          last_name = displayUser.last_name;
      var token = (0, _handleToken.generateToken)({
        id: id,
        email: email,
        phoneNumber: phoneNumber
      });
      var loggedIn = {
        id: id,
        token: token,
        first_name: first_name,
        last_name: last_name,
        email: email
      };
      return (0, _Feedback.userFeedback)(res, 200, loggedIn);
    } catch (err) {
      return (0, _Feedback.findError)(res);
    }
  }
};
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map