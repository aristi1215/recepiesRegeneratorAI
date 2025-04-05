import { Router } from "express";
import { database } from "../mongodb/connection.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { userInfo } = req.body;
  try {
    const data = await database.collection("users").insertOne({ ...userInfo });
    res.json({ message: "sucessfully created user", sessionId: data.insertedId});
  } catch (err) {
    res.json({ messge: "An error has occurred while creating the user" });
  }
});

authRouter.post("/signIn", async (req, res) => {
    const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ message: "Missing email or password" });
    return
  }

  try {
    const user = await database.collection("users").findOne({ email, password });
    
    if (!user) {
      res.status(401).json({ message: "Incorrect email or password" });
      return
    }
    
    res.json({ message: "Successfully signed in", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error has occurred while signing in" });
  }
});

authRouter.get("/profile", async (req, res) => {
    const { id} = req.body;
  
  if (!id) {
    res.status(400).json({ message: "Missing email or password" });
    return
  }

  try {
    const user = await database.collection("users").findOne({ _id: id });
    
    if (!user) {
      res.status(401).json({ message: "Incorrect email or password" });
      return
    }
    
    res.json({ message: "Successfully fetched profile", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error has occurred while fetching the profile" });
  }
});