import { connectDatabase } from "../../../helpers/db";
import { hashPassword } from "../../../helpers/auth";

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

  if (req.method == "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      errorMessageHandeling(res, 422, {
        message: "invalid input, password should also be at least 7 characters",
      });
      client.close();
      return;
    }

    const db = client.db();
    const collectionLength = await db.collection("admin").countDocuments();

    if (collectionLength < 2) {
      const existingAdmin = await db
        .collection("admin")
        .findOne({ email: email });

      if (existingAdmin) {
        errorMessageHandeling(res, 422, {
          message: "Admin already exists",
        });
        client.close();
        return;
      }

      const hashedPassword = await hashPassword(password);

      const result = await db
        .collection("admin")
        .insertOne({ email: email, password: hashedPassword });

      res.status(201).json({ message: "A new admin is created" });
      client.close();
    } else {
      errorMessageHandeling(res, 422, {
        message:
          "Collection already has 2 documents. Cannot insert a new document.",
      });
      client.close();
      return;
    }
  }
};

export default handler;
