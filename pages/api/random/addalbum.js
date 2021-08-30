import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { album } = JSON.parse(req.body);

  await db.collection("albums").insertOne({ album: album });

  res.end("operation attempted");
};
