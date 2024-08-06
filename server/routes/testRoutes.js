import express from 'express';
import { testAPI } from '../controllers/testController.js';

const router = express.Router();

router.route('/:test').get(testAPI);

export default router;
