import { google } from "googleapis";

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;

export default async function handler(req, res) {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_ID,
    GOOGLE_SECRET,
    GOOGLE_REDIRECT_URL
  );

  console.log("redirect uri: ", GOOGLE_REDIRECT_URL);

  const url = oauth2Client.generateAuthUrl({
    scope: ["profile", "email"],
  });

  res.writeHead(301, { Location: url });

  res.end();
}
