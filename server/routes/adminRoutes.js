import express from 'express';
const router = express.Router();
import { registerAdmin, loginAdmin, protectAdmin } from '../controllers/authController.js';
import { generateKeys, generateShamirSecrets } from '../controllers/adminController.js';

router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);

router.route('/generate-shares').post(protectAdmin, generateShamirSecrets);
router.patch('/generate-keys', generateKeys);

export default router;
