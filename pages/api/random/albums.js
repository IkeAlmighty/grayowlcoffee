import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const albums = await db.collection("albums").find({}).toArray();

  //convert each album document to a string of the album name
  let names = albums.map((a) => a.album);
  res.json({ albums: names.sort() });
}
