import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://patients.db');

window.db = db;

async function initDb() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      treatment TEXT NOT NULL,
      department TEXT NOT NULL
    );
  `);
}

async function getUserByEmail(email) {
    try {
      const result = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null; 
    }
  }

async function registerUser(name, email, password, treatment, department) {
  try {
    await db.exec(
        `INSERT INTO users (name, email, password, treatment, department)
        VALUES ('${name}', '${email}', '${password}', '${treatment}', '${department}')`
    );
    return { success: true };
  } catch (error) {
    return { success: false, message: `Email already exists or insert failed due to ${error}`};
  }
}

initDb();

export { db, getUserByEmail, registerUser };
