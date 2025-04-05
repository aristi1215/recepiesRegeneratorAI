import { RecepiesModel } from "../models/recepies.js";

export class RecepiesController {
  static getAll = async (req, res) => {
    const { id } = req.query;
    try {
      const recepies = await RecepiesModel.getAll(id);
      res.json({message: 'success fetching the recepies', data: recepies})
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'internal error fetching recepies'})
    }
  };

  static saveRecepie = async (req, res) => {
    if(!req.body.recepie){
        res.status(400).json({messge: 'please provide all the information for the recepie'})
        return
    }
    try {
      RecepiesModel.saveRecepie(req.body.recepie);
      res.json({ recepie: req.body.recepie });
    } catch (err) {
      console.error("Error calling the save recepie model");
      res.json({ message: "Error saving the recepie", err });
    }
  };
}
