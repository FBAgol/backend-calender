import { db } from './db_connection';

export const createTables= async()=> {

    const userTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL  UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;

  await db.query(userTableQuery, (err: string, result:string) => {
    if (err) throw err;
    console.log('User table created');
  });
}