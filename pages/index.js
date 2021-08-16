import Head from "next/head";
import styles from "./index.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
import Navigation from "../lib/components/Navigation";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className="container">
      <Head>
        <title>Gray Owl Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <footer></footer>
    </div>
  );
}
