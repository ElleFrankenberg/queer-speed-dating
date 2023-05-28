import {
  containsOnlyLetters,
  phoneNumberIsCorrect,
} from "../../helpers/formUtil";
import { MongoClient, ObjectId } from "mongodb";
import { connectDatabase } from "../../helpers/db";

// const connectDatabase = async () => {
//   const client = await MongoClient.connect(process.env.DB_URL);
//   return client;
// };

const insertDocument = async (client, collection, email, document) => {
  const db = client.db();

  const existingParticipant = await db
    .collection(collection)
    .findOne({ email: email });

  if (existingParticipant) {
    errorMessageHandeling(res, 422, {
      message: "Participant already exists",
    });
    client.close();
    return;
  } else {
    const result = await db.collection(collection).insertOne(document);
    return result;
  }
};

const deleteAllDocuments = async (client, collection) => {
  const db = client.db();
  await db.collection(collection).deleteMany({});
  return;
};

const deleteOneDocument = async (client, collection, participantId) => {
  const db = client.db();
  const id = new ObjectId(participantId);
  await db.collection(collection).deleteOne({ _id: id });
  return;
};

const addOrUpdateOneDocument = async (
  client,
  collection,
  participantId,
  likesData
) => {
  const db = client.db();
  const id = new ObjectId(participantId);
  console.log(id);
  const filter = { _id: id };
  const update = { $set: { likesData: likesData } };
  const options = { returnOriginal: false };
  const result = await db
    .collection(collection)
    .findOneAndUpdate(filter, update, options);
  return result;
};

// export const getAllDocuments = async (client, collection) => {
//   const db = client.db();
//   const documents = await db.collection(collection).find().toArray();
//   return documents;
// };

const errorMessageHandeling = (res, code, message) => {
  const errorMessage = res.status(code).json(message);
  return errorMessage;
};

const handler = async (req, res) => {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    errorMessageHandeling(res, 500, {
      message: "Connecting to the database faild",
    });
    return;
  }

  if (req.method === "POST") {
    const { firstName, lastName, email, number } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !number ||
      containsOnlyLetters(firstName) === false ||
      containsOnlyLetters(lastName) === false ||
      phoneNumberIsCorrect(number) === false ||
      !email.includes("@")
    ) {
      errorMessageHandeling(res, 422, {
        message: "invalid input",
      });
      client.close();
      return;
    }

    const newParticipant = {
      firstName,
      lastName,
      email,
      number,
    };

    let result;

    try {
      result = await insertDocument(
        client,
        "participants",
        newParticipant.email,
        newParticipant
      );
      newParticipant.id = result.insertedId.toString();
      res
        .status(201)
        .json({ message: "Added participant", participant: newParticipant });
    } catch (error) {
      errorMessageHandeling(res, 500, {
        message: "Inserting participant faild",
      });
    }
  }

  if (req.method === "PATCH") {
    const { participantId, likesData } = req.body;
    let result;
    try {
      result = await addOrUpdateOneDocument(
        client,
        "participants",
        participantId,
        likesData
      );
      res.status(200).json({
        message: "Data to the document is added or updated",
        likesData: likesData,
      });
    } catch (error) {
      errorMessageHandeling(res, 500, {
        message: "Adding or inserting data faild",
      });
    }
  }

  // if (req.method === "GET") {
  //   try {
  //     const documents = await getAllDocuments(client, "participants");
  //     res.status(200).json({ participants: documents });
  //   } catch (error) {
  //     errorMessageHandeling(res, 500, {
  //       message: "Getting participants faild",
  //     });
  //   }
  // }

  if (req.method === "DELETE") {
    const { participantId } = req.body;

    if (participantId) {
      try {
        await deleteOneDocument(client, "participants", participantId);
        res.status(200).json({ message: "The participant is deleted" });
      } catch (error) {
        errorMessageHandeling(res, 500, {
          message: "Deleting the participant faild",
        });
      }
    } else {
      try {
        await deleteAllDocuments(client, "participants");
        res.status(200).json({ message: "all participants are deleted" });
      } catch (error) {
        errorMessageHandeling(res, 500, {
          message: "Deleting all participants faild",
        });
      }
    }
  }

  client.close();
};

export default handler;
