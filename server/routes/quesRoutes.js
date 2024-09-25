import express from 'express';
const router = express.Router();
import { retrieveQuestions, uploadQuestion, postSolution } from '../controllers/quesController.js';
import { protectAdmin, protectStudent } from '../controllers/authController.js';
// import upload from '../middleware/multer.js';

router.route('/get-questions').get(protectStudent, retrieveQuestions);
router.route('/upload').post(protectAdmin, uploadQuestion); //add multer + cloudinary for questions having a diagram

export default router;
