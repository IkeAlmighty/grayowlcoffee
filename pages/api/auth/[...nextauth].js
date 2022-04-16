import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../lib/mongodb";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Providers.Slack({
    //   clientId: process.env.SLACK_CLIENT_ID,
    //   clientSecret: process.env.SLACK_CLIENT_SECRET,
    // }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: async (token, account) => {
      // if it's my email, then it's an admin:
      // if (token.email === "isaacyates7@gmail.com") token.isAdmin = true;

      // check if the user is on the database as an admin
      const { db } = await connectToDatabase();
      const isAdmin = await db
        .collection("admin-users")
        .findOne({ email: token.email });

      // if the user is on the database as an admin, then
      // set token.isAdmin to true
      if (isAdmin) token.isAdmin = true;

      return token;
    },
    session: async (session, token) => {
      session.isAdmin = token.isAdmin;
      return session;
    },
  },
});
