import pg from 'pg'
const { Pool } = pg
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config)
const db = (query, values) => pool
  .query(query, values)
  .then(({ rows }) => rows)
  .catch((error) => error)

export default db