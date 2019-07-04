import UserModel from '../models/user';
import { serverFeedback, userFeedback, findError } from '../helpers/Feedback';
import Authentication from '../helpers/auth';
const User = {

  signUp(req, res) {
    if (!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.password && !req.body.address && !req.body.phoneNumber) {
      return res.status(400).send({ 'message': 'Please Fill all fields' })
    }
    const allUserList = UserModel.AllUsers();
    const Index = allUserList.findIndex(u => u.email === req.body.email);
    if (Index >= 0){
      return serverFeedback(res, 403, ...['status', 'error', 'data', { 'message': 'User already exist'}]);
    }
    const User = UserModel.signUp(req.body);
    return res.status(201).json({
      status: "success",
      data: User
    }
    );
  },
  login(req, res) {
    try {
      const { password, email } = req.body;
      const allUserList = UserModel.AllUsers();
      const displayUser = allUserList.find(u => u.email === email);
      if (!displayUser) {
        return serverFeedback(res, 403, ...['status', 'error', 'data',{ 'message': 'Invalid email'}]);
      }

      const decryptedPassword = Authentication.comparePassword(displayUser.password,password);
      if (!decryptedPassword) {
        return serverFeedback(res, 422, ...['status', 'error', 'data', { 'message': 'Incorrect Password'}]);
      }
      const {
        id, phoneNumber, first_name, last_name
      } = displayUser;
      const token = Authentication.generateToken({ id, email, phoneNumber });
      const loggedIn = {
        id, token, first_name, last_name, email
      };
      return userFeedback(res, 200, loggedIn);
    } catch (err) {
      return findError(res);
    }
  }
}

export default User;