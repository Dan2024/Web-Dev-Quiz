import { Router } from 'express';
import { getQuestionsByCategory } from '../controllers/question.js';

const router = Router();

router.get('/:category', getQuestionsByCategory);

export default router;
