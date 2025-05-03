import { PGlite } from '@electric-sql/pglite'

const db = new PGlite('idb://patient-registry');

async function initDB() {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT,
          age INTEGER,
          gender TEXT
        )
      `);
      
}

initDB();
export default db;