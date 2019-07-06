"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _property = _interopRequireDefault(require("../models/property"));

var _Feedback = require("../helpers/Feedback");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Property = {
  addProperty: function addProperty(req, res) {
    try {
      var id = req.tokenData.id;
      var _req$body = req.body,
          state = _req$body.state,
          city = _req$body.city,
          address = _req$body.address,
          type = _req$body.type,
          price = _req$body.price,
          image_url = _req$body.image_url;

      var displayResult = _property["default"].addNew({
        owner: id,
        price: price,
        state: state,
        city: city,
        image_url: image_url,
        type: type,
        address: address
      });

      return _Feedback.serverFeedback.apply(void 0, [res, 201].concat(['status', 'success', 'data', displayResult]));
    } catch (err) {
      return (0, _Feedback.findError)(res);
    }
  },
  updateProperty: function updateProperty(req, res) {
    try {
      var propId = Number(req.params.propertyId);

      var propArray = _property["default"].AllProperty();

      var propertyData = propArray.find(function (property) {
        return property.id === propId;
      });
      var propIndex = propArray.findIndex(function (property) {
        return property.id === propId;
      });
      var _req$body2 = req.body,
          state = _req$body2.state,
          city = _req$body2.city,
          address = _req$body2.address,
          type = _req$body2.type,
          price = _req$body2.price,
          image_url = _req$body2.image_url;
      propertyData.state = propertyData.state === state ? propertyData.state : state;
      propertyData.price = propertyData.price === price ? propertyData.price : price;
      propertyData.city = propertyData.city === city ? propertyData.city : city;
      propertyData.address = propertyData.address === address ? propertyData.address : address;
      propertyData.image_url = propertyData.image_url === image_url ? propertyData.image_url : image_url;
      propertyData.type = propertyData.type === type ? propertyData.type : type;

      _property["default"].updateProperty(propertyData, propIndex);

      return _Feedback.serverFeedback.apply(void 0, [res, 200].concat(['status', 'success', 'data', propertyData]));
    } catch (err) {
      return (0, _Feedback.findError)(res);
    }
  },
  deleteProperty: function deleteProperty(req, res) {
    try {
      var id = Number(req.params.propertyId);

      var propToDelete = _property["default"].deleteProperty(id);

      if (propToDelete) {
        return _Feedback.serverFeedback.apply(void 0, [res, 200].concat(['status', 'success', 'data', {
          'message': 'Property deleted Successfully'
        }]));
      }

      return _Feedback.serverFeedback.apply(void 0, [res, 404].concat(['status', 'error', 'data', {
        'message': 'Property not found. Property may have been removed'
      }]));
    } catch (err) {
      return (0, _Feedback.findError)(res);
    }
  },
  markSold: function markSold(req, res) {
    try {
      var id = Number(req.params.propertyId);

      var propArray = _property["default"].AllProperty();

      var propToUpdate = propArray.find(function (property) {
        return property.id === id;
      });
      var propIndex = propArray.findIndex(function (property) {
        return property.id === id;
      });
      propToUpdate.status = 'Sold';

      _property["default"].updateProperty(propToUpdate, propIndex);

      return _Feedback.serverFeedback.apply(void 0, [res, 200].concat(['status', 'success', 'data', propToUpdate]));
    } catch (err) {
      return (0, _Feedback.findError)(res);
    }
  },
  getPropertyType: function getPropertyType(data, type) {
    var specificPropertyType = data.filter(function (property) {
      return property.type === type;
    });
    return specificPropertyType;
  },
  getAllProperty: function getAllProperty(req, res) {
    try {
      var allProperty = _property["default"].AllProperty();

      var allUsers = User.AllUsers();
      var finalList = allProperty.map(function (pro) {
        var ownerID = pro.owner;
        var user = allUsers.find(function (el) {
          return el.id === ownerID;
        });
        pro.ownerEmail = user.email;
        pro.ownerPhoneNumber = user.phoneNumber;

        var owner = pro.owner,
            finalResult = _objectWithoutProperties(pro, ["owner"]);

        return finalResult;
      });

      if (req.query.type) {
        var type = req.query.type;
        var queryResult = getPropertyType(finalList, type);

        if (queryResult.length) {
          return _Feedback.serverFeedback.apply(void 0, [res, 200].concat(['status', 'success', 'data', queryResult]));
        } else {
          _Feedback.serverFeedback.apply(void 0, [res, 403].concat(['status', 'error', 'data', {
            'message': 'Enter a valid value and try again.'
          }]));
        }
      }

      return _Feedback.serverFeedback.apply(void 0, [res, 200].concat(['status', 'success', 'data', finalList]));
    } catch (err) {
      return (0, _Feedback.findError)(res);
    }
  },
  getOneProperty: function getOneProperty(req, res) {
    try {
      var id = Number(req.params.propertyId);
      if (!id) return _Feedback.serverFeedback.apply(void 0, [res, 403].concat(['status', 'error', 'data', {
        'message': 'Invalid ID'
      }]));

      var result = _property["default"].findProperty(id);

      if (!result) return _Feedback.serverFeedback.apply(void 0, [res, 404].concat(['status', 'error', 'data', {
        'message': 'No result found. Enter a valid value and try again.'
      }]));
      var proOwnerID = result.owner;

      var userList = _user["default"].AllUsers();

      var proOwner = userList.find(function (user) {
        return user.id === proOwnerID;
      });
      result.ownerEmail = proOwner.email;
      result.ownerPhoneNumber = proOwner.phoneNumber;

      var owner = result.owner,
          finalResult = _objectWithoutProperties(result, ["owner"]);

      return _Feedback.serverFeedback.apply(void 0, [res, 200].concat(['status', 'success', 'data', finalResult]));
    } catch (err) {
      return (0, _Feedback.findError)(res);
    }
  }
};
var _default = Property;
exports["default"] = _default;
//# sourceMappingURL=property.js.map