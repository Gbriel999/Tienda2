import db from '../database/db_connect.js'

export const register = ({ email, pass }) => db('INSERT INTO usuarios (id, email, pass) VALUES (DEFAULT,$1,$2);',[email, pass])
export const login = ({ email, pass }) => {
    return db('SELECT email FROM usuarios WHERE email = $1 and pass = $2;', [email, pass])
}
