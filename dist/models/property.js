"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _storage = _interopRequireDefault(require("../data/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Property =
/*#__PURE__*/
function () {
  function Property() {
    _classCallCheck(this, Property);

    this.proList = _storage["default"].propertyList;
  }

  _createClass(Property, [{
    key: "addNew",
    value: function addNew(p) {
      var owner = p.owner,
          price = p.price,
          state = p.state,
          city = p.city,
          address = p.address,
          type = p.type,
          image_url = p.image_url;
      var proId = this.proList.length;
      Id = proId + 1;
      var newProperty = {
        owner: owner,
        id: Id,
        price: price,
        state: state,
        city: city,
        type: type,
        address: address,
        image_url: image_url,
        created_on: _moment["default"].now(),
        status: 'Available'
      };
      this.proList.push(newProperty);
      return newProperty;
    }
  }, {
    key: "AllProperty",
    value: function AllProperty() {
      return this.proList;
    }
  }, {
    key: "findProperty",
    value: function findProperty(id) {
      var oneProperty = this.proList.find(function (property) {
        return property.id === id;
      });
      return oneProperty;
    }
  }, {
    key: "updateProperty",
    value: function updateProperty(propObj, propId) {
      this.proList.splice(propId, 1, propObj);
      return this.proList;
    }
  }, {
    key: "deleteProperty",
    value: function deleteProperty(id) {
      var propArr = this.proList;
      var propIndex = propArr.findIndex(function (property) {
        return property.id === id;
      });

      if (propIndex >= 0) {
        propArr.splice(propIndex, 1);
        return true;
      }

      return false;
    }
  }]);

  return Property;
}();

var _default = new Property();

exports["default"] = _default;
//# sourceMappingURL=property.js.map