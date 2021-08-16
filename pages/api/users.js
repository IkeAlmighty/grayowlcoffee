import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const users = await db.collection("users").find({}).limit(20).toArray();

  res.json(users);
};
