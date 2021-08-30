import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { name, month, year, day, role, action } = parse(req);
  // 'action' is either CANNOT, PREFERNOT, or PREFER
  if (action !== "CANNOT" || action !== "PREFERNOT" || action !== "PREFER") {
    res.json({
      error: `invalid action: ${action}. Please use 'CANNOT', 'PREFER', or 'PREFNOT' as actions.`,
    });
    res.end();
    return;
  }

  const { db } = connectToDatabase();

  // update the availability database with the new availability data
  let mongoRes = await db
    .collection("availabilities")
    .updateOne({ name }, { month, year, day, role, action });

  console.log(mongoRes);
  res.end(mongoRes.body);
};

// parse function for bot requests from slack.
function parse(req) {
  // let parsing = req.body.text.split(" ");
  let name = req.body.user;
  return { name };
}