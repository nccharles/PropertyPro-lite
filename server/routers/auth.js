import { Router } from 'express';
import User from '../controllers/user';
const router = Router();
router.post('/signup', User.signUp);
router.post('/signin', User.login);

export default router;