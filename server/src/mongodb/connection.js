import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv'


dotenv.config()

const client = new MongoClient(process.env.CONNECTION, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Close db connection
process.on('SIGINT', ()=>{
  client.close();
  console.log("closed database connection");
  process.exit(1);
})

const connection = client.connect();
const database = client.db('recepiesAI'); 

export { connection, database };