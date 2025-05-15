import { Router } from 'express';
import * as juegosController from '../controllers/juegos.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verificarToken);

router.get('/', juegosController.listarJuegos);
router.post('/', juegosController.crearJuego);
router.put('/:id', juegosController.editarJuego);
router.delete('/:id', juegosController.eliminarJuego);

export default router;
