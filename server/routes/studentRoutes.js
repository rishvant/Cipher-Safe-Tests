import express from 'express';
const router = express.Router();
import { registerStudentForExam } from '../controllers/studentController.js';
import upload from '../middleware/multer.js';
import { loginStudent, protectStudent } from '../controllers/authController.js';
import { postSolution } from '../controllers/quesController.js';

router.post('/register', upload.single('image'), registerStudentForExam);
router.post('/login', loginStudent);

router.use(protectStudent);
router.route('/post-solution').post(postSolution);

export default router;
