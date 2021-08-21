import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { name, month, year, day, role, action } = parse(req);
  const { db } = connectToDatabase();

  // update the availability database with the new availability data
};

function parse(req) {
  return {};
}
