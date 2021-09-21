import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { collection, query, field, value } = JSON.parse(req.body);

    await db
      .collection(collection)
      .updateOne(query, { $set: { [field]: value } }, { upsert: true });

    res.end("operation attempted");
  } else if (req.method === "GET") {
    const { query, field, collection } = req.query;

    let mongoRes = await db.collection(collection).findOne(JSON.parse(query));

    res.json({ data: mongoRes[field] });
  }
};
