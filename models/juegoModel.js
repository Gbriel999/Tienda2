import pool from '../db/index.js';

export const getAllJuegos = async () => {
  const res = await pool.query('SELECT * FROM juegos ORDER BY id');
  return res.rows;
};

export const createJuego = async (juego) => {
  const { id, nombre, precio, stock } = juego;
  const res = await pool.query(
    'INSERT INTO juegos (id, nombre, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, nombre, precio, stock]
  );
  return res.rows[0];
};

export const getJuegoById = async (id) => {
  const res = await pool.query('SELECT * FROM juegos WHERE id = $1', [id]);
  return res.rows[0];
};

export const updateJuego = async (juego) => {
  const { id, nombre, precio, stock } = juego;
  const res = await pool.query(
    'UPDATE juegos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING *',
    [nombre, precio, stock, id]
  );
  return res.rows[0];
};

export const deleteJuego = async (id) => {
  await pool.query('DELETE FROM juegos WHERE id = $1', [id]);
};
