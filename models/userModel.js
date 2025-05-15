import pool from '../db/index.js';
import bcrypt from 'bcryptjs';

export const buscarUsuarioPoremail = async (email) => {
  const result = await pool.query(
    'SELECT id, email, password FROM usuarios WHERE email = $1',
    [email]
  );
  return result.rows[0];
};


export const crearUsuario = async (email, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const result = await pool.query(
    'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, hashedPassword]
  );

  return result.rows[0];
};