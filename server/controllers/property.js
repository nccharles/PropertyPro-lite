import UserModel from "../models/user";
import PropertyModel from "../models/property";
import { serverFeedback, findError } from "../helpers/Feedback";
const Property = {
    addProperty(req, res) {
        try {
            const { id } = req.tokenData;
            console.log(id)
            const {
                state, city, address, type, price, image_url
            } = req.body;
            const displayResult = PropertyModel.addNew({
                owner: id,
                price,
                state,
                city,
                image_url,
                type,
                address
            });
            return serverFeedback(res, 201, ...['status', 'success', 'data', displayResult]);
        } catch (err) {
            return findError(res);
        }
    },
    updateProperty(req, res) {
        try {
            const propId = Number(req.params.propertyId);
            const propArray = PropertyModel.AllProperty();
            const propertyData = propArray.find(property => property.id === propId);
            const propIndex = propArray.findIndex(property => property.id === propId);
            const {
                state, city, address, type, price, image_url
            } = req.body;
            propertyData.state = (propertyData.state === state) ? propertyData.state : state;
            propertyData.price = (propertyData.price === price) ? propertyData.price : price;
            propertyData.city = (propertyData.city === city) ? propertyData.city : city;
            propertyData.address = (propertyData.address === address) ? propertyData.address : address;
            propertyData.image_url = (propertyData.image_url === image_url) ? propertyData.image_url : image_url;
            propertyData.type = (propertyData.type === type) ? propertyData.type : type;
            PropertyModel.updateProperty(propertyData, propIndex);
            return serverFeedback(res, 200, ...['status', 'success', 'data', propertyData]);
        } catch (err) {
            return findError(res);
        }
    },
    getAllProperty(req, res) {
        try {
            const properties = PropertyModel.AllProperty();
            return res.status(200).json({'status':'success','data': properties});
        } catch (err) {
            return res.status(500).json({'status':'error','data':{"message":'something went wrong'+err}});
        }
    },
    deleteProperty(req, res) {
        try {
            const id = Number(req.params.propertyId);
            const propToDelete = PropertyModel.deleteProperty(id);
            if (propToDelete) {
                return serverFeedback(res, 200, ...['status', 'success', 'data', { 'message': 'Property deleted Successfully' }]);
            }
            return serverFeedback(res, 404, ...['status', 'error', 'data', { 'message': 'Property not found. Property may have been removed' }]);

        } catch (err) {
            return findError(res);
        }
    },
    markSold(req, res) {
        try {
            const id = Number(req.params.propertyId);
            const propArray = PropertyModel.AllProperty();
            const propToUpdate = propArray.find(property => property.id === id);
            const propIndex = propArray.findIndex(property => property.id === id);
            propToUpdate.status = 'Sold';
            PropertyModel.updateProperty(propToUpdate, propIndex);
            return serverFeedback(res, 200, ...['status', 'success', 'data', propToUpdate]);
        } catch (err) {
            return findError(res);
        }
    },
    getPropertyType(data, type) {
        const specificPropertyType = data.find(property => property.type === type);
        return specificPropertyType;
    },
    getSpecific(req, res) {
        try {
            const properties = PropertyModel.AllProperty();
            const allUsers = UserModel.AllUsers();
            const finalList = properties.map((pro) => {
                const ownerID = pro.owner;
                const user = allUsers.find(el => el.id === ownerID);
                pro.ownerEmail = user.email;
                pro.ownerPhoneNumber = user.phoneNumber;
                const { owner, ...finalResult } = pro;
                return finalResult;
            });
            if (req.query.type) {
                const { type } = req.query;
                const Result = getPropertyType(properties, type);
                if (Result.length) {
                    return serverFeedback(res, 200, ...['status', 'success', 'data', queryResult]);
                } else {
                    return serverFeedback(res, 403, ...['status', 'error', 'data', { 'message': 'Enter a valid value and try again.' }]);
                }
            }
            return serverFeedback(res, 200, ...['status', 'success', 'data', finalList]);
        } catch (err) {
            return findError(res);
        }
    },
    getOneProperty(req, res) {
        try {
            const id = Number(req.params.propertyId);
            if (!id) return serverFeedback(res, 403, ...['status', 'error', 'data', { 'message': 'Invalid ID' }]);
            const result = PropertyModel.findProperty(id);
            if (!result) return serverFeedback(res, 404, ...['status', 'error', 'data', { 'message': 'No result found. Enter a valid value and try again.' }]);
            const proOwnerID = result.owner;
            const userList = UserModel.AllUsers();
            const proOwner = userList.find(user => user.id === proOwnerID);
            result.ownerEmail = proOwner.email;
            result.ownerPhoneNumber = proOwner.phoneNumber;
            const { owner, ...finalResult } = result;
            return serverFeedback(res, 200, ...['status', 'success', 'data', finalResult]);
        } catch (err) {
            return findError(res);
        }
    }
}
export default Property;
