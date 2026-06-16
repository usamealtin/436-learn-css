import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getQuizByTopic, submitQuiz } from '../controllers/quizController';

const router = Router();

router.get('/:topic_key', authenticateToken, getQuizByTopic);
router.post('/submit', authenticateToken, submitQuiz);

export default router;