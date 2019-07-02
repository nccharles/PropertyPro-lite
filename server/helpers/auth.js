import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Authentication = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(id) {
    const token = jwt.sign({
      id,
    },
    'secret', { expiresIn: '7d' });
    return token;
  },
};

export default Authentication;