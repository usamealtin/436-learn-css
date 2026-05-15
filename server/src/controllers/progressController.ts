import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getUserProgress = async (req: Request, res: Response) => {
  const { learner_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM topic_progress WHERE learner_id = $1',
      [learner_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'İlerleme durumu yüklenirken hata oluştu.' });
  }
};

export const updateProgress = async (req: Request, res: Response) => {
  const { learner_id, topic_id, progress_percent, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO topic_progress (learner_id, topic_id, progress_percent, status, last_accessed_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (learner_id, topic_id) 
       DO UPDATE SET 
          progress_percent = EXCLUDED.progress_percent,
          status = EXCLUDED.status,
          last_accessed_at = NOW()
       RETURNING *`,
      [learner_id, topic_id, progress_percent, status]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'İlerleme güncellenemedi.' });
  }
};