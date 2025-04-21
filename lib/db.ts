import sql from "better-sqlite3";

const db = sql("expense-manager.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  );
`);

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE,
  amount TEXT,
  category TEXT,
  date TEXT,
  status TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

db.exec(`
   CREATE TABLE IF NOT EXISTS bills (
  id INTEGER PRIMARY KEY,
  name TEXT,
  amount TEXT,
  category TEXT,
  status TEXT,
  date TEXT,
  url TEXT,
  user_id INTEGER,
  expense_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (expense_id) REFERENCES expenses(id)
)`);

export default db;
