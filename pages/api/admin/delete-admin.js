import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { connectDatabase } from "../../../helpers/db";

const errorMessageHandeling = (res, code, message) => {
  const errorMessage = res.status(code).json(message);
  return errorMessage;
};

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    errorMessageHandeling(res, 401, {
      message: "Not authenticated!",
    });
    return;
  }

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    errorMessageHandeling(res, 500, {
      message: "Connecting to the database faild",
    });
    return;
  }

  const adminEmail = session.user.email;
  const adminCollection = client.db().collection("admin");

  const result = await adminCollection.deleteOne({ email: adminEmail });

  if (result) {
    res.status(200).json({ message: "Admin deleted" });
  } else {
    errorMessageHandeling(res, 500, {
      message: "Deleting admin failed",
    });
  }
  client.close();
};

export default handler;
