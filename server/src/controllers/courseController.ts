import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kurslar yüklenirken bir hata oluştu.' });
  }
};

export const getCourseDetail = async (req: Request, res: Response) => {
  const { course_id } = req.params;

  try {
    const courseResult = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);
    
    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Kurs bulunamadı.' });
    }

    const topicsResult = await pool.query(
      'SELECT * FROM topics WHERE course_id = $1 ORDER BY order_no ASC',
      [course_id]
    );

    res.json({
      ...courseResult.rows[0],
      topics: topicsResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kurs detayları getirilirken bir hata oluştu.' });
  }
};