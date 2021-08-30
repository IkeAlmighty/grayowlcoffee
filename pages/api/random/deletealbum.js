import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const {
    query: { album },
  } = req;

  await db.collection("albums").deleteOne({ album: album });

  res.end("operation attempted");
};
