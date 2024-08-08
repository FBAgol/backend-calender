import { app } from "./app";
import dotenv from 'dotenv'
import { connectDB } from "./db/db_connection";
import{createTables} from '../src/db/createTables'

dotenv.config();

const port = process.env.PORT;
const startServer = async () => {
  console.log('Connecting to the database...');
  
  await connectDB(); // Stelle die Verbindung zur Datenbank her
  
  console.log('Creating tables...');
  
  createTables(); // Tabelle erstellen, aber ohne asynchrone Logik
  
  // Stelle sicher, dass die Tabelle erstellt wird, bevor du den Server startest
  setTimeout(() => {
    console.log(`Starting server on port ${port}...`);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }, 1000); // Warte 1 Sekunde, um sicherzustellen, dass die Tabelle erstellt wird
};

startServer();