"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("../helpers/auth"));

var _moment = _interopRequireDefault(require("moment"));

var _storage = _interopRequireDefault(require("../data/storage"));

var _handleToken = require("../middleware/handleToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);

    this.users = _storage["default"].usersList;
  }

  _createClass(User, [{
    key: "signUp",
    value: function signUp(data) {
      var userId = this.users.length + 1;

      var hashPassword = _auth["default"].hashPassword(data.password);

      var tokenData = (0, _handleToken.generateToken)([userId, data.password, data.email]);
      var newUser = {
        id: userId,
        token: tokenData,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: hashPassword,
        phoneNumber: data.phoneNumber,
        address: data.address,
        isAdmin: false,
        created_on: _moment["default"].now()
      };
      this.users.push(newUser);
      return newUser;
    }
  }, {
    key: "AllUsers",
    value: function AllUsers() {
      return this.users;
    }
  }]);

  return User;
}();

var _default = new User();

exports["default"] = _default;
//# sourceMappingURL=user.js.map