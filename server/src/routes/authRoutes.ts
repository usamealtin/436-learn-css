import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validate, schemas } from '../middleware/validationMiddleware';

const router = Router();

/**
 * @route
 * @desc
 */
router.post(
  '/register', 
  validate(schemas.auth.register),
  register
);

/**
 * @route
 * @desc
 */
router.post(
  '/login', 
  validate(schemas.auth.login),
  login
);

/**
 * @route
 * @desc
 */
router.get('/me', authenticateToken, getMe);

export default router;