import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { connectDatabase } from "../../../helpers/db";
import { verifyPassword, hashPassword } from "@/helpers/auth";

const errorMessageHandeling = (res, code, message) => {
  const errorMessage = res.status(code).json(message);
  return errorMessage;
};

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  console.log(session);

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const adminEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    errorMessageHandeling(res, 500, {
      message: "Connecting to the database faild",
    });
    return;
  }

  const adminCollection = client.db().collection("admin");

  const admin = await adminCollection.findOne({ email: adminEmail });

  if (!admin) {
    errorMessageHandeling(res, 404, {
      message: "Admin not found",
    });
    client.close();
    return;
  }

  const currentPassword = admin.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    errorMessageHandeling(res, 403, {
      message: "Invalid password",
    });
    client.close();
    return;
  }
  const hashedPassword = await hashPassword(newPassword);

  const result = await adminCollection.updateOne(
    { email: adminEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "your password is now changed" });
}

export default handler;
