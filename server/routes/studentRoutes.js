import express from 'express';
const router = express.Router();
import { registerStudentForExam } from '../controllers/studentController.js';
import upload from '../middleware/multer.js';

router.post('/register', upload.single('image'), registerStudentForExam);

export default router;
