import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db';
import certificateRoutes from './routes/certificateRoutes';
import authRoutes from './routes/authRoutes';
import quizRoutes from './routes/quizRoutes';
import topicRoutes from './routes/topicRoutes';
import progressRoutes from './routes/progressRoutes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.use(cors({
  origin: [
    'https://436learncss.vercel.app',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/certificates', certificateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/progress', progressRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', environment: ENV });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Aradığınız sayfa bulunamadı.',
    path: req.originalUrl 
  });
});

app.use(errorHandler);

app.listen(Number(PORT), '0.0.0.0', async () => {
  console.log('---');
  console.log(` Sunucu başlatıldı!`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Ortam: ${ENV}`);
  console.log('---');
  
  try {
    await testDbConnection();
    console.log('✅ Veritabanı bağlantısı başarılı.');
  } catch (err) {
    console.error('❌ Veritabanı bağlantısı başarısız:', err);
  }
});