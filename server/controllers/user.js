import UserModel from '../models/user';

const User = {
 
  signUp(req, res) {
    if (!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.password && !req.body.address && !req.body.phoneNumber) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const User = UserModel.signUp(req.body);
    return res.status(201).send(User);
  },
}

export default User;