import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const { method } = req;

  if (method === "GET") {
    let events = await db
      .collection("events")
      .find({})
      .project({ _id: 0 })
      .toArray();

    res.status(200).json(events);
    return;
  } else if (method === "POST") {
    const { event } = JSON.parse(req.body);
    const keys = Object.keys(event);
    for (let i = 0; i < keys.length; i++) {
      if (event[keys[i]] === undefined || event[keys[i]] === "") {
        res.status(400).send(`Required: ${keys[i]}`);
        return;
      }
    }

    let mongores = await db.collection("events").insertOne(event);

    res.status(201).send(mongores.insertedId);
    return;
  } else if (method === "DELETE") {
    const { event } = JSON.parse(req.body);
    console.log(event);
    let mongores = await db.collection("events").deleteOne(event);
    // console.log(mongores);
    res.status(201).end();
    return;
  } else {
    res.status(400).end();
  }
};
