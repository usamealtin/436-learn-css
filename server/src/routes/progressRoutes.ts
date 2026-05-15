import { Router } from 'express';
import { getUserProgress, updateProgress } from '../controllers/progressController';

const router = Router();

router.get('/:learner_id', getUserProgress);
router.post('/update', updateProgress);

export default router;