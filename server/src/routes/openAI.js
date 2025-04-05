import { Router } from 'express';
import OpenAI from 'openai';
import * as dotenv from 'dotenv'


dotenv.config()

export const gptRouter = Router()

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_SECRET_KEY,
});


gptRouter.get('/', (req, res) => {
    res.send('hola')
})


gptRouter.post("/create", async (req, res) => {
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
  