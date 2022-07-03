export default function signout(req, res) {
  // delete the auth session cookie!

  res.setHeader(
    "set-cookie",
    "auth-token=deleted; path=/; httponly; samesite=lax;"
  );

  res.setHeader("Location", "/");

  res.status(307).end();
}
