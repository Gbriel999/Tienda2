import db from '../database/db_connect.js'
import bcrypt from 'bcrypt'
export const register = async ({ email, pass }) => {
  try {
    const hashedPass = await bcrypt.hash(pass, 10) // 10 rondas de sal
    return db('INSERT INTO usuarios (id, email, pass) VALUES (DEFAULT, $1, $2);', [email, hashedPass])
  } catch (error) {
    return { code: 500, message: 'Error al registrar usuario', error }
  }
}

export const login = async ({ email, pass }) => {
  try {
    const result = await db('SELECT * FROM usuarios WHERE email = $1;', [email])
    if (result.length === 0) {
      return [] 
    }

    const user = result[0]
    const passwordMatch = await bcrypt.compare(pass, user.pass)
    if (!passwordMatch) {
      return [] 
    }

    return [user] 
  } catch (error) {
    return { code: 500, message: 'Error al hacer login', error }
  }
}
