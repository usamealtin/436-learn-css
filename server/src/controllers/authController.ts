import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const fullName = `${firstName} ${lastName}`.trim();
    const userExists = await pool.query(
      'SELECT * FROM learners WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Bu email adresi zaten kayıtlı.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      `INSERT INTO learners (email, password_hash, user_name) 
       VALUES ($1, $2, $3) 
       RETURNING learner_id, email, user_name, created_at`,
      [email, hashedPassword, fullName]
    );

    const user = newUser.rows[0];
    const token = jwt.sign({ id: user.learner_id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      user: {
        id: user.learner_id,
        email: user.email,
        username: user.user_name,
        createdAt: user.created_at
      }, 
      token 
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM learners WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Geçersiz email veya şifre.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Geçersiz email veya şifre.' });
    }

    const token = jwt.sign({ id: user.learner_id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      user: {
        id: user.learner_id,
        email: user.email,
        username: user.user_name,
        createdAt: user.created_at
      }, 
      token 
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: any, res: Response, next: NextFunction) => {
  try {
    const result = await pool.query(
      'SELECT learner_id, email, user_name, created_at FROM learners WHERE learner_id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const user = result.rows[0];

    res.json({ 
      user: {
        id: user.learner_id,
        email: user.email,
        username: user.user_name,
        createdAt: user.created_at
      }
    });
  } catch (err) {
    next(err);
  }
};