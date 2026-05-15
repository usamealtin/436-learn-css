import { Router } from 'express';
import { getQuizByTopic, submitQuiz } from '../controllers/quizController';

const router = Router();

router.get('/:topic_key', getQuizByTopic);
router.post('/submit', submitQuiz);

export default router;