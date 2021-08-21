import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  const { db } = connectToDatabase();

  // read all availabilities

  // generate the schedule based on the availabilities read

  // store the generated schedule in database

  // return the generated schedule as a json doc
};
