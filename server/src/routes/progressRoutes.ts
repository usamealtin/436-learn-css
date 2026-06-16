import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getUserProgress, updateProgress } from '../controllers/progressController';

const router = Router();

router.get('/:learner_id', authenticateToken, getUserProgress);
router.post('/update', authenticateToken, updateProgress);

export default router;