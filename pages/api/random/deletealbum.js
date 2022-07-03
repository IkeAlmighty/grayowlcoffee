import { connectToDatabase } from "../../../lib/mongodb";
import { getSession } from "../../../lib/auth";

export default async function handler(req, res) {
  const session = getSession({ req });
  if (session && session.isAdmin) {
    const { db } = await connectToDatabase();
    const {
      query: { album },
    } = req;

    await db.collection("albums").deleteOne({ album: album });

    res.end("operation attempted");
  } else {
    res.end(401);
  }
}
