import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://patients.db');

await db.execute(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    condition TEXT NOT NULL
  );
`);

export default db;