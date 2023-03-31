import { connectDatabase } from "../../helpers/dbUtil";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, number } = req.body;

    console.log(firstName, lastName, email, number);
  }
  res.status(201).json({ message: "Signed up" });
};

export default handler;
