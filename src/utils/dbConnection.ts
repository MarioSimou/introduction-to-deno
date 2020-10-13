import SqliteDB, { SqliteOptions } from "../types/SqliteDB.ts";

let db: any;

export const initDatabase = (path: string) => {
  const options: SqliteOptions = { path };
  db = new SqliteDB(options);

  db.query(`
    CREATE TABLE IF NOT EXISTS pokemons(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL UNIQUE,
      category text NOT NULL,
      height real NOT NULL,
      weight real NOT NULL
    )
  `);
};

export const getDatabase = (): any => db;
