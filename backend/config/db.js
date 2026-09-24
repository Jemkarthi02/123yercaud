import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder or project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'xiadot.com',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'yercaud123',
  password: process.env.DB_PASSWORD || '123yercaud@123',
  database: process.env.DB_NAME || '123yercaud_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

export default pool;
