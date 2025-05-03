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
      role TEXT NOT NULL DEFAULT 'patient'
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

async function registerUser(name, email, password, role = 'patient') {
  try {
    await db.exec(
        `INSERT INTO users (name, email, password, role)
        VALUES ('${name}', '${email}', '${password}', '${role}')`
    );

    return { success: true };
  } catch (error) {
    return { success: false, message: "Email already exists or insert failed.", error };
  }
}

initDb();

export { db, getUserByEmail, registerUser };
