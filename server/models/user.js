import Authentication from '../helpers/auth';
import moment from 'moment';
import proData from '../data/storage';
class User {
    constructor() {
        this.users = proData.usersList;
    }
    signUp(data) {
        let userId=this.users.length + 1;
        const hashPassword = Authentication.hashPassword(data.password);
        
        const tokenData = Authentication.generateToken([userId,data.password,data.email]);
      
        const newUser = {
            id: userId,
            token: tokenData,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: hashPassword,
            phoneNumber: data.phoneNumber,
            address: data.address,
            isAdmin: false,
            created_on: moment.now(),
        };
        this.users.push(newUser);
        return newUser
    }
    AllUsers() {
        return this.users;
      }

}
export default new User();