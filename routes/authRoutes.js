import express from 'express';
const router = express.Router();

import { register, login, updateUse } from '../controllers/authController.js'

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUse);

export default router;