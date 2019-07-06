"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _property = _interopRequireDefault(require("../controllers/property"));

var _handleToken = require("../middleware/handleToken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/', _handleToken.checkToken, _property["default"].addProperty);
router.patch('/:propertyId', _handleToken.checkToken, _property["default"].updateProperty);
router.patch('/:propertyId/sold', _handleToken.checkToken, _property["default"].markSold);
router["delete"]('/:propertyId', _handleToken.checkToken, _property["default"].deleteProperty);
router.get('/', _property["default"].getAllProperty);
router.get('/:propertyId', _property["default"].getAllProperty);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=property.js.map