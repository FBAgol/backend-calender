import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'mysql',
  password: 'db_mysql',
  database: 'calender',
});

export const connectDB = async () => {
  return new Promise<void>((resolve, reject) => {
    db.connect((err:any) => {
      if (err) {
        console.log("Cannot connect to the database");
        reject(err);
      } else {
        console.log("Connected to the database");
        resolve();
      }
    });
  });
};
