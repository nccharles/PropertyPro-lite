"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userFeedback = exports.authFeedback = exports.serverFeedback = exports.findError = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var findError = function findError(res) {
  return res.status(500).json({
    status: 'error',
    data: {
      'message': "Something went wrong. Try again later"
    }
  });
};

exports.findError = findError;

var serverFeedback = function serverFeedback(res, status) {
  var _res$status$json;

  for (var _len = arguments.length, _ref = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    _ref[_key - 2] = arguments[_key];
  }

  var statusKey = _ref[0],
      statusResult = _ref[1],
      Key = _ref[2],
      Value = _ref[3];
  return res.status(status).json((_res$status$json = {}, _defineProperty(_res$status$json, statusKey, statusResult), _defineProperty(_res$status$json, Key, Value), _res$status$json));
};

exports.serverFeedback = serverFeedback;

var authFeedback = function authFeedback(res, status) {
  var _res$status$json2;

  for (var _len2 = arguments.length, _ref2 = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    _ref2[_key2 - 2] = arguments[_key2];
  }

  var statusKey = _ref2[0],
      statusResult = _ref2[1],
      Key = _ref2[2],
      Value = _ref2[3];
  return res.status(status).json((_res$status$json2 = {}, _defineProperty(_res$status$json2, statusKey, statusResult), _defineProperty(_res$status$json2, Key, Value), _res$status$json2));
};

exports.authFeedback = authFeedback;

var userFeedback = function userFeedback(res, status, userData) {
  return res.status(status).json({
    status: 'success',
    data: userData
  });
};

exports.userFeedback = userFeedback;
//# sourceMappingURL=Feedback.js.map