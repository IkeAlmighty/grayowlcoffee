import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = connectToDatabase();
  let { month } = req.body;

  // read all availabilities
  let mongoRes = await db.collection("availabilities").find({ month });
  let availabilities = mongoRes.body;

  // generate the schedule based on the availabilities read
  let schedule = generateSchedule(availabilities);

  // store the generated schedule in database
  // TODO move upsert to different api endpoint
  await db
    .collection("schedules")
    .updateOne({ month }, { $set: { month, schedule } }, { upsert: true });

  // return the generated schedule as a json doc

  res.end({ schedule });
};

function generateSchedule(availabilities) {}