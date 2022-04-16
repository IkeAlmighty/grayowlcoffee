import { connectToDatabase } from "../../../lib/mongodb";
import { sendToSlack } from "../../../lib/slack";
//FIXME Bad actors (bots!) could send weird shit to the slack channel

export default async function handler(req, res) {
  const { channel, message } = JSON.parse(req.body);
  const { db } = await connectToDatabase();

  let mongoRes = await db
    .collection("catering-orders")
    .insertOne({ confirmed: false, order: message });

  const link = `localhost:3000/catering/${mongoRes.insertedId}`;

  let slackRes = await sendToSlack(
    channel,
    `${message}\n\nconfirmation link:\n${link}`
  );

  res.status(slackRes.ok ? 200 : 400).end();
}
