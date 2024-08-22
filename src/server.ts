import { app } from "./app";
import dotenv from 'dotenv'
import { connectDB } from "./db/db_connection";
import{createTables} from '../src/db/createTables'

dotenv.config();

const port = process.env.PORT;
const startServer = async () => {
  await connectDB();
  await createTables();

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};


startServer();

