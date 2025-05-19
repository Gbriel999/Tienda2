import express from 'express'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import { juegosRouter, usuariosRouter, errors } from './routers/index.js'

const app = express()
const PORT = process.env.PORT ?? 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(usuariosRouter)
app.use(juegosRouter)
app.use(errors)
app.listen(PORT, () => console.log('Servidor levantado en el puerto', PORT))

export default app
