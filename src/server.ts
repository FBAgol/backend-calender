import { app } from "./app";
import dotenv from 'dotenv'
import db from './db/db-connection'

dotenv.config();

const port = process.env.PORT;


const startServer = async () => {
  try {
    await db.initialize();
    console.log("Database connection established successfully");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error: any) {
    console.error("Failed to initialize the database connection:", error);
  }
};

startServer();


