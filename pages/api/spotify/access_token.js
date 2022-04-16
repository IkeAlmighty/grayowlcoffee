import SpotifyWebApi from "spotify-web-api-node";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const base64Credentials = Buffer.from(
    process.env.SPOTIFY_ID + ":" + process.env.SPOTIFY_SECRET
  ).toString("base64");

  let spotifyResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  let json = await spotifyResponse.json();

  console.log(json);

  res.status(200).send(json.access_token);
}
