import { database } from "../mongodb/connection";
export class RecepiesModel {
  static getAll = async () => {
    try {
      return await database.collection("recepies").find({});
    } catch (err) {
      console.error({
        message: "error fetching the data from the database",
        error: err,
      });
    }
  };

  static insertOne = async ({ recepie }) => {
    try {
      await database.collection("recepies").insertOne(recepie);
    } catch (err) {
      console.error({
        message: "error creating the recepie from the database",
        error: err,
      });
    }
  };

  static updateMovie = async ({ id, updatedRecepie }) => {
    const filter = { _id: id };
    const updateDoc = {
      $set: {
        ...updatedRecepie,
      },
    };

    try {
      await database.collection("recepies").updateOne(filter, updateDoc);
      return updateDoc;
    } catch (err) {
      console.error({
        message: "error updating the recepie from the database",
        error: err,
      });
    }
  };
}
