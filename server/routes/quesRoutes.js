import express from 'express';
const router = express.Router();
import { uploadQuestion } from '../controllers/quesController.js';
import { protectAdmin } from '../controllers/authController.js';
// import upload from '../middleware/multer.js';

router.use(protectAdmin);
router.route('/upload').post(uploadQuestion); //add multer + cloudinary for questions having a diagram

export default router;
