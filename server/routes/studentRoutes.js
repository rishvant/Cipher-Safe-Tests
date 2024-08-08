import express from 'express';
const router = express.Router();
import { registerStudentForExam } from '../controllers/studentController.js';

router.route('/register').post(registerStudentForExam);

export default router;
