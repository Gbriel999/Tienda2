import pool from '../db/index.js';

export const listarJuegos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM juegos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    res.status(500).json({ message: 'Error al obtener juegos' });
  }
};

export const crearJuego = async (req, res) => {
  const { nombre, precio, stock } = req.body;

  // Validación simple para INT y string
  if (
    !nombre ||
    !Number.isInteger(precio) ||
    !Number.isInteger(stock)
  ) {
    return res.status(400).json({ message: 'Datos inválidos: nombre es requerido, precio y stock deben ser enteros' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO juegos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *',
      [nombre, precio, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear juego:', error);
    res.status(500).json({ message: 'Error al crear juego' });
  }
};

export const editarJuego = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  if (
    !nombre ||
    !Number.isInteger(precio) ||
    !Number.isInteger(stock)
  ) {
    return res.status(400).json({ message: 'Datos inválidos: nombre es requerido, precio y stock deben ser enteros' });
  }

  try {
    const result = await pool.query(
      'UPDATE juegos SET nombre=$1, precio=$2, stock=$3 WHERE id=$4 RETURNING *',
      [nombre, precio, stock, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Juego no encontrado' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    res.status(500).json({ message: 'Error al actualizar juego' });
  }
};

export const eliminarJuego = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM juegos WHERE id=$1', [id]);
    res.json({ message: 'Juego eliminado' });
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    res.status(500).json({ message: 'Error al eliminar juego' });
  }
};
