import { MongoClient } from "mongodb";
import { config } from "dotenv";

module.exports = async (req, res) => {
  if (req.method == "GET") {
    res.json([
      {
        name: "aymen",
        location: "algeria",
      },
      {
        name: "saleh",
        location: "egypt",
      },
      {
        name: "djamel",
        location: "tunisia",
      },
    ]);
  } else if (req.method == "POST") {
    let mongoClient;
    try {
      mongoClient = new MongoClient(process.env.DB_URI);
      console.log("Connecting to MongoDB Atlas cluster...");
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB Atlas!");

      // go to serverless db
      const db = mongoClient.db("serverless");
      // go to users collection
      const collection = db.collection("users");

      //create user document
      const userDocument = {
        name: req.body.fullname,
        birthdate: new Date(2000, 12, 27),
        address: { street: "Aflou 03001", city: "Aflou", state: "AF" },
      };

      await collection.insertOne(userDocument);

      res.status(204).json({
        message: "done",
      });
    } catch (error) {
      res.status(404);
      console.error("Connection to MongoDB Atlas failed!", error);
    } finally {
      await mongoClient.close();
    }
  }
};
