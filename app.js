import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import juegosRoutes from './routes/juegos.routes.js';

import { serverLog } from './middlewares/serverLog.middleware.js';
import { verificarToken } from './middlewares/auth.middleware.js';  // Importa el middleware de token

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serverLog);
app.use(express.static(path.join(__dirname, 'public')));

// Rutas públicas
app.use('/auth', authRoutes);

// Middleware para proteger rutas que requieren autenticación
app.use('/juegos', verificarToken, juegosRoutes);

app.listen(PORT, () => console.log(`Servidor levantado en puerto ${PORT}`));

export default app;
