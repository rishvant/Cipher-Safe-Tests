import express from 'express';
const router = express.Router();
import { registerAdmin, loginAdmin, protectAdmin } from '../controllers/authController.js';
import { generateShamirSecrets } from '../controllers/adminController.js';


router.route('/register').post(registerAdmin);
router.route('/login').post(loginAdmin);

router.use(protectAdmin);

router.route('/generate-shares').post(generateShamirSecrets);

export default router;
