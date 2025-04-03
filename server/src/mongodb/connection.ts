import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(process.env.CONNECTION || 'mongodb+srv://juanarieda:juan1020302325@draw-ai-app.c8jei.mongodb.net/?retryWrites=true&w=majority&appName=draw-ai-app', {
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