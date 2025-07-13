import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import { Conversion } from '../types/Conversion';

let db: Database;

async function getOrInsertConversion(inputValue: Conversion["inputValue"], direction: Conversion["direction"], convertedValue: Conversion["convertedValue"]) {
  const existing = await db.get<Conversion>(
    'SELECT * FROM conversions WHERE inputValue = ? AND direction = ?',
    [inputValue.toString(), direction]
  );
  if (existing) {
    return existing;
  }
  const result = await db.run(
    'INSERT INTO conversions (inputValue, convertedValue, direction) VALUES (?, ?, ?)',
    [inputValue.toString(), convertedValue.toString(), direction]
  );
  return { id: result.lastID, inputValue, convertedValue, direction };
}

async function start() {
  const dbPath = path.join(__dirname, 'conversions.db');
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS conversions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inputValue TEXT NOT NULL,
    convertedValue TEXT NOT NULL,
    direction TEXT NOT NULL
  )`);
}

function setDb(newDb: Database) {
  db = newDb;
}

export { db, getOrInsertConversion, start, setDb }; 