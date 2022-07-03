// check to see if the user is an admin, then
// create the appropiate jwt and
// store it as an httpOnly cookie
import { google } from "googleapis";
import jwt from "jsonwebtoken";

import { connectToDatabase } from "../../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

export default async function handler(req, res) {
  const { code } = req.query;

  // grab user information from google client:
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_ID,
    GOOGLE_SECRET,
    GOOGLE_REDIRECT_URL
  );

  const { tokens } = await oauth2Client.getToken(code);

  let userInfo = jwt.decode(tokens.id_token);

  // check to see if this user exists in the database:
  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ _id: userInfo.email });

  // if the user and user role exists, then set the role of the user in the userInfo:
  userInfo.role = user && user.role ? user.role : "basic";

  // create jwt token with session data and google access token:
  // FIXME: I'm reencoding it because i want to make it secure with my own JWT secret,
  // and I'm not sure that google's token even... takes a secret??
  const token = jwt.sign(userInfo, JWT_SECRET);

  res.setHeader(
    "set-cookie",
    `auth-token=${token}; path=/; httponly; samesite=lax;`
  );

  res.setHeader("Location", "/admin");

  res.status(307).end();
}
