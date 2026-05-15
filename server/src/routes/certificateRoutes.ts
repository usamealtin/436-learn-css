import { Router } from 'express';
import { getCertificates, issueCertificate } from '../controllers/certificateController';

const router = Router();

router.get('/:learner_id', getCertificates);
router.post('/issue', issueCertificate);

export default router;