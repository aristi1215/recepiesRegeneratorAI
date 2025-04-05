import express from "express";
import cors from "cors";
import { connection,database } from "./mongodb/connection.js";
import { recepiesRouter } from './routes/recepies.js';
import { gptRouter } from "./routes/openAI.js";
import { authRouter } from "./routes/auth.js";
import * as dotenv from 'dotenv';

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
dotenv.config()

app.use('/api/v1/recepies',recepiesRouter)
app.use('/api/v1/gpt',gptRouter)
app.use('/api/v1/auth',authRouter)

try {
  const connectDb = async () => {
    await connection;
    console.log('successfully connected to the database')
    app.listen(port, () => {
      console.log(`app listening on port: ${port}. link: http://localhost:${port}`);
    });
  } 
  connectDb()
}catch(err){
  console.error(err)
}



