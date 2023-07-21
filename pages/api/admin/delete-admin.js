import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
};

export default handler;
