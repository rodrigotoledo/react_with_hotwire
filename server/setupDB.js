const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbPath = path.resolve(__dirname, process.env.DB_PATH || './database.sqlite');

const connectDB = () => {
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    } else {
      console.log('Connected to database');
    }
  });
};

const initializeDB = (db) => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      )
    `);
  });
};

const db = connectDB();
initializeDB(db);

module.exports = db;
