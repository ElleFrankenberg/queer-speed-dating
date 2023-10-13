import {
  containsOnlyLetters,
  phoneNumberIsCorrect,
} from "../../helpers/formUtil";
import { ObjectId } from "mongodb";
import { connectDatabase } from "../../helpers/db";

const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
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
      message: "Connecting to the database faild.",
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
    const db = client.db();
    const collectionLength = await db
      .collection("participants")
      .countDocuments();

    console.log(collectionLength, "collectionLength");
    if (collectionLength < 100) {
      try {
        const existingParticipant = await db
          .collection("participants")
          .findOne({ email: email });

        if (existingParticipant) {
          errorMessageHandeling(res, 422, {
            message: "Participant already exists.",
          });
          client.close();
          return;
        }

        result = await insertDocument(client, "participants", newParticipant);
        newParticipant.id = result.insertedId.toString();
        res
          .status(201)
          .json({ message: "Added participant", participant: newParticipant });
      } catch (error) {
        errorMessageHandeling(res, 500, {
          message: "Adding participant faild.",
        });
      }
    } else {
      errorMessageHandeling(res, 422, {
        message: "Maximun number of participants reached.",
      });
      client.close();
      return;
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
