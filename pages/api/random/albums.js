import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const albums = await db.collection("albums").find({}).toArray();

  //convert each album document to a string of the album name
  res.json({ albums: albums.map((a) => a.album) });
};
