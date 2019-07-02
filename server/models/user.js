import Authentication from '../helpers/auth';
import moment from 'moment';
class User {
    constructor() {
        this.users = [];
    }
    signUp(data) {
        let userId=this.users.length + 1;
        const hashPassword = Authentication.hashPassword(data.password);
        
        const tokenData = Authentication.generateToken(userId);
      
        const newUser = {
            id: userId,
            token: tokenData,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: hashPassword,
            phoneNumber: data.phoneNumber,
            address: data.address,
            isAdmin: data.isAdmin,
            created_on: moment.now(),
            modified_on: moment.now(),
        };
        this.users.push(newUser);
        return newUser
    }


}
export default new User();