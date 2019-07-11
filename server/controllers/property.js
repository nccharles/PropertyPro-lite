import UserModel from "../models/user";
import PropertyModel from "../models/property";
import { serverFeedback, findError } from "../helpers/Feedback";
import imageUpload from "../middleware/cloudinary";
const Property = {
    async addProperty(req, res) {
        try {
            const { id } = req.tokenData;
            const image = req.files.image_url;

            const image_url = await imageUpload(image);
            if (!image_url) {
                image_url = "https://images.io/123"
            }
            const {
                state, city, address, type, price
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
            return serverFeedback(res, 201, ...['status', 201, 'data', displayResult]);
        } catch (err) {
            return findError(res);
        }
    },
    updateProperty(req, res) {
        try {
            const propId = req.params.propertyId;
            const propArray = PropertyModel.AllProperty();
            const propertyData = propArray.find(property => property.id == propId);
            const propIndex = propArray.findIndex(property => property.id == propId);
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
            return serverFeedback(res, 200, ...['status', 200, 'data', propertyData]);
        } catch (err) {
            return findError(res);
        }
    },

    deleteProperty(req, res) {
        try {
            const id = req.params.propertyId;
            const propToDelete = PropertyModel.deleteProperty(id);
            if (propToDelete) {
                return serverFeedback(res, 200, ...['status', 200, 'data', propToDelete]);
            }
            return serverFeedback(res, 404, ...['status', 404, 'error', 'Property not found. Property may have been removed']);

        } catch (err) {
            return findError(res);
        }
    },
    markSold(req, res) {
        const { propertyId } = req.params
        try {
            const propArray = PropertyModel.AllProperty();
            const propToUpdate = propArray.find(property => property.id == propertyId);
            const propIndex = propArray.findIndex(property => property.id == propertyId);
            propToUpdate.status = 'Sold';
            PropertyModel.updateProperty(propToUpdate, propIndex);
            return serverFeedback(res, 200, ...['status', 200, 'data', propToUpdate]);
        } catch (err) {
            return findError(res);
        }
    },

    getAllProperty(req, res) {
        try {
            const properties = PropertyModel.AllProperty();
            if (req.query.type) {
                const { type } = req.query
                const Result = properties.find(property => property.type === type);
                if (Result) {
                    return serverFeedback(res, 200, ...['status', 200, 'data', Result]);
                } else {
                    return serverFeedback(res, 403, ...['status', 403, 'error', 'Enter a valid value and try again.']);
                }
            }
            return serverFeedback(res, 200, ...['status', 200, 'data', properties]);
        } catch (err) {
            return findError(res);
        }
    },
    getOneProperty(req, res) {
        try {
            const id = req.params.propertyId;
            if (!id) return serverFeedback(res, 403, ...['status', 403, 'error', 'Invalid ID']);
            const result = PropertyModel.findProperty(id);
            if (!result) return serverFeedback(res, 404, ...['status', 404, 'error', 'No result found. Enter a valid value and try again.']);
            const proOwnerID = result.owner;
            const userList = UserModel.AllUsers();
            const proOwner = userList.find(user => user.id === proOwnerID);
            result.ownerEmail = proOwner.email;
            result.ownerPhoneNumber = proOwner.phoneNumber;
            const { owner, ...finalResult } = result;
            return serverFeedback(res, 200, ...['status', 200, 'data', finalResult]);
        } catch (err) {
            return findError(res);
        }
    }
}
export default Property;
