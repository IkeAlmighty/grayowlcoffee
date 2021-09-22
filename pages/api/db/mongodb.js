import { connectToDatabase } from "../../../lib/mongodb";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    if (session && session.isAdmin) {
      const { collection, query, field, value } = JSON.parse(req.body);

      await db
        .collection(collection)
        .updateOne(query, { $set: { [field]: value } }, { upsert: true });

      res.end("operation attempted");
    } else {
      // not signed in as an admin
      res.end(401);
    }
  } else if (req.method === "GET") {
    const { query, field, collection } = req.query;

    let mongoRes = await db.collection(collection).findOne(JSON.parse(query));

    res.json({ data: mongoRes[field] });
  }
};
