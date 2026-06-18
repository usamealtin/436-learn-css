import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // Tüm hataları görmek için abortEarly: false

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};

export const schemas = {
  auth: {
    register: Joi.object({
      email: Joi.string().email().required().messages({
        'string.email': 'Geçerli bir e-posta adresi giriniz.',
        'any.required': 'E-posta alanı zorunludur.'
      }),
      password: Joi.string().min(6).required().messages({
        'string.min': 'Şifre en az 6 karakter olmalıdır.'
      }),
      username: Joi.string().alphanum().min(3).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required()
    }),

    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    profileUpdate: Joi.object({
      currentPassword: Joi.string().required().messages({
        'any.required': 'Mevcut şifre zorunludur.'
      }),
      newEmail: Joi.string().email().required().messages({
        'string.email': 'Geçerli bir e-posta adresi giriniz.',
        'any.required': 'Yeni e-posta zorunludur.'
      })
    }),
    changePassword: Joi.object({
      currentPassword: Joi.string().required().messages({
        'any.required': 'Mevcut şifre zorunludur.'
      }),
      newPassword: Joi.string().min(6).required().messages({
        'string.min': 'Yeni şifre en az 6 karakter olmalıdır.',
        'any.required': 'Yeni şifre zorunludur.'
      })
    })
  },

  progress: Joi.object({
    learner_id: Joi.string().uuid().required(),
    topic_id: Joi.string().uuid().required(),
    progress_percent: Joi.number().min(0).max(100).required(),
    status: Joi.string().valid('not_started', 'in_progress', 'completed').required()
  })
};