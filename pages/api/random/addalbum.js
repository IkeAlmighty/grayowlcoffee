import { connectToDatabase } from "../../../lib/mongodb";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session && session.isAdmin) {
    const { db } = await connectToDatabase();
    const { album } = JSON.parse(req.body);

    await db.collection("albums").insertOne({ album: album });

    res.end("operation attempted");
  } else {
    // not signed in as an admin
    res.end(401);
  }
};
