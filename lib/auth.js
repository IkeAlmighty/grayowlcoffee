import jwt from "jsonwebtoken";
import cookie from "cookie";

// server side function for getting the session token
export function getSession({ req }) {
  // throw an error if this is called from the frontend:
  if (typeof window !== "undefined") {
    throw new Error("getSession is not a client side function");
  }

  let token = undefined;
  // get the jwt token from the request header, if it has been set:
  if (req.headers.cookie) {
    token = cookie.parse(req.headers.cookie)["auth-token"];
  }
  // return a null session object if the token has not been set
  if (!token) return null;

  // try to verify the jwt, if it is signed correctly, then return the session data:
  try {
    const session = jwt.verify(token, process.env.JWT_SECRET);
    // TODO: after implementing expiration on /api/auth/google/callback, impl expiration check here:

    return session;
  } catch (err) {
    // return null if jwt signing verification fails:
    return null;
  }
}
