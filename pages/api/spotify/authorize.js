import fetch from "node-fetch";
import querystring from "query-string";

export default async function handler(req, res) {
  const redirect_uri =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://grayowl.coffee";

  const params = querystring.stringify({
    client_id: process.env.SPOTIFY_ID,
    response_type: "code",
    redirect_uri,
    scope: "user-read-currently-playing",
  });

  // res.writeHead(302, {
  //   Location: `https://accounts.spotify.com/authorize?${params}`,
  // });

  res.end(
    `<script>document.location = "https://accounts.spotify.com/authorize?${params}"</script>`
  );
}
