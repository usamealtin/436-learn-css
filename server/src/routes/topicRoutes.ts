import { Router } from 'express';
import { getAllCourses, getCourseDetail } from '../controllers/courseController';

const router = Router();

router.get('/courses', getAllCourses);
router.get('/courses/:course_id', getCourseDetail);

export default router;