import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { connection,database } from "./mongodb/connection";

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_SECRET_KEY ||
    "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",
});

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

try {
  const connectDb = async () => {
    await connection;
    console.log('successfully connected to the database')
    app.listen(port, () => {
      console.log(`app listening on port: ${port}. link: http://localhost:3001`);
    });
  } 
  connectDb()
}catch(err){
  console.error(err)
}


app.get("/", (req, res) => {
  res.send("hola");
});

app.post("/recepie/create", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    res.status(400).json({ mesage: "Please provide the ingredients" });
    return;
  }

  try {
    const response = await openai.responses.create({
      model: "gpt-4o",
      input: `Using only the ingredients provided, generate a complete recipe. Your response should include three sections: 'Ingredients', 'title' and 'Steps'. List only the ingredients needed for the recipe and provide clear, step-by-step instructions on how to prepare it. Avoid any additional commentary or explanations. This are the ingredients: tomatoes, lettuce, eggs, bacon. Please give me the response back as a json. these are the ingredients: ${ingredients}`,
      text: {
        format: { type: "json_object" },
      },
    });
    res.json(response);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error has occurred while creating the recepie" });
  }
});
