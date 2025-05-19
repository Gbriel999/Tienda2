import { Router } from 'express'
import * as juegosController from '../controllers/juegos.controller.js'
import { authToken } from '../middlewares/juegos.middleware.js'

const router = Router()

router.get('/juegos', authToken, juegosController.MostrarTodos)
router.get('/juegos/:id', authToken, juegosController.MostrarPorId)
router.post('/juegos', authToken, juegosController.create)
router.put('/juegos/:id', authToken, juegosController.ActualizarPorId)
router.delete('/juegos/:id', authToken,juegosController.BorrarPorId)

export default router
