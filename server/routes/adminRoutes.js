import express from 'express';
const router = express.Router();
import { registerAdmin, loginAdmin } from '../controllers/authController.js';

router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);

export default router;
