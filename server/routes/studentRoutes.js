import express from 'express';
const router = express.Router();
import { registerStudentForExam } from '../controllers/studentController.js';
import upload from '../middleware/multer.js';

router.route('/register', upload.single('image')).post(registerStudentForExam);

export default router;
