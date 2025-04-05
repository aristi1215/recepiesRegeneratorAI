import { ObjectId } from "mongodb";
import { database } from "../mongodb/connection";

export class RecepiesModel {
  static getAll = async (id) => {
    try {
      const recepies = await database.collection("recepies").aggregate([
        { $match: { user_id: new ObjectId(id) } },
        {
          $lookup: {
            from: "users", 
            localField: "user_id",
            foreignField: "_id",
            as: "userRecepies" 
          }
        }
      ]).toArray();
      console.log(recepies)
  
      return recepies;
    } catch (err) {
      console.error({
        message: "Error fetching the data from the database",
        error: err,
      });
      return [];
    }
  };
  

  static saveRecepie = async (recepie) => {
    try {
      await database.collection("recepies").insertOne({...recepie, user_id: new ObjectId(recepie.user_id)});
    } catch (err) {
      console.error({
        message: "error creating the recepie from the database",
        error: err,
      });
    }
  };

}
