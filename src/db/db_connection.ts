import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  port:3306,
  user: 'mysql',
  password: 'db_mysql',
  database: 'calender',
});

export const connectDB = async () => {
    try{
        return await db.connect()
    }catch(err){
        console.log("can not be connected with database")
    }
  };