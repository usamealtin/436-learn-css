import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const testDbConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Neon DB Bağlantısı Başarılı:', res.rows[0].now);
    return res;
  } catch (err) {
    console.error('❌ Neon DB Bağlantı Hatası:', err);
    throw err;
  }
};