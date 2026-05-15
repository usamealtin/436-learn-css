import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { v4 as uuidv4 } from 'uuid';

/**
 * @desc
 * @route
 */
export const getCertificates = async (req: Request, res: Response, next: NextFunction) => {
  const { learner_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM certificates WHERE learner_id = $1 ORDER BY issued_at DESC',
      [learner_id]
    );
    
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc
 * @route
 */
export const issueCertificate = async (req: Request, res: Response, next: NextFunction) => {
  const { learner_id, completed_topics } = req.body; 

  try {
    const certificate_code = `CERT-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;
    
    const newCertificate = await pool.query(
      `INSERT INTO certificates (
        certificate_id, 
        learner_id, 
        certificate_code, 
        completed_topics
      ) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [
        uuidv4(), 
        learner_id, 
        certificate_code, 
        JSON.stringify(completed_topics)
      ]
    );

    res.status(201).json(newCertificate.rows[0]);
  } catch (err) {
    next(err);
  }
};