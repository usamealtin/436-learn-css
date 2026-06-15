import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import { v4 as uuidv4 } from 'uuid';

/**
 * @desc
 * @route
 */
export const getQuizByTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { topic_key } = req.params;

  try {
    const quizResult = await pool.query(
      'SELECT * FROM quizzes WHERE topic_key = $1',
      [topic_key]
    );
    
    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Bu konu için sınav bulunamadı.' });
    }

    const quiz = quizResult.rows[0];

    const questionsResult = await pool.query(
      `SELECT q.*, 
       json_agg(json_build_object('option_id', o.option_id, 'option_text', o.option_text)) as options
       FROM quiz_questions q
       JOIN quiz_options o ON q.question_id = o.question_id
       WHERE q.quiz_id = $1
       GROUP BY q.question_id
       ORDER BY q.order_no ASC`,
      [quiz.quiz_id]
    );

    res.json({
      quiz,
      questions: questionsResult.rows
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc
 * @route
 */
export const submitQuiz = async (req: Request, res: Response, next: NextFunction) => {
  const { learner_id, quiz_id, answers } = req.body; 

  try {
    const correctOptions = await pool.query(
      'SELECT question_id, option_id FROM quiz_options WHERE is_correct = true AND question_id IN (SELECT question_id FROM quiz_questions WHERE quiz_id = $1)',
      [quiz_id]
    );

    let correctCount = 0;
    answers.forEach((ans: any) => {
      const isCorrect = correctOptions.rows.find(
        opt => opt.question_id === ans.question_id && opt.option_id === ans.chosen_option_id
      );
      if (isCorrect) correctCount++;
    });

    const totalQuestions = correctOptions.rows.length;
    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const isPassed = scorePercent >= 80;

    const attempt_id = uuidv4();
    await pool.query(
      `INSERT INTO quiz_attempts (attempt_id, learner_id, quiz_id, score_percent, is_passed, started_at, submitted_at) 
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [attempt_id, learner_id, quiz_id, scorePercent, isPassed]
    );

    const answerPromises = answers.map((ans: any) => {
      return pool.query(
        'INSERT INTO quiz_answers (answer_id, attempt_id, question_id, chosen_option_id, answered_at) VALUES ($1, $2, $3, $4, NOW())',
        [uuidv4(), attempt_id, ans.question_id, ans.chosen_option_id]
      );
    });
    
    await Promise.all(answerPromises);

    res.json({ 
      scorePercent, 
      isPassed, 
      correctCount, 
      totalQuestions 
    });
  } catch (err) {
    next(err);
  }
};