import {
  containsOnlyLetters,
  phoneNumberIsCorrect,
} from "../../helpers/formUtil";
import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(process.env.DB_URL);
  return client;
};

export const insertDocument = async (client, collection, email, document) => {
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

// export const getAllDocuments = async (client, collection) => {
//   const db = client.db();
//   const documents = await db.collection(collection).find().toArray();
//   return documents;
// };

export const errorMessageHandeling = (res, code, message) => {
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

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "participants");
      res.status(200).json({ participants: documents });
    } catch (error) {
      errorMessageHandeling(res, 500, {
        message: "Getting participants faild",
      });
    }
  }

  client.close();
};

export default handler;
