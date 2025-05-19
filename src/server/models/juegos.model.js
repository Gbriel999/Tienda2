import db from '../database/db_connect.js'

export const MostrarTodos = () => db('SELECT * FROM juegos;')
export const MostrarPorId = (id) => db('SELECT * FROM juegos WHERE id = $1;', [id])

export const create = ({ nombre, precio, stock }) =>
  db('INSERT INTO juegos (id, nombre, precio, stock) VALUES (DEFAULT, $1, $2, $3) RETURNING *;', [nombre, precio, stock])

export const ActualizarPorId = (id, { nombre, precio, stock }) =>
  db('UPDATE juegos SET nombre = $2, precio = $3, stock = $4 WHERE id = $1 RETURNING *;', [id, nombre, precio, stock])

export const BorrarPorId = (id) => db('DELETE FROM juegos WHERE id = $1 RETURNING *;', [id])
