import Head from "next/head";
import FlexButton from "../components/FlexButton";
import { useSession } from "next-auth/client";
import Location from "../components/home/Location";
import RandomQuote from "../components/home/RandomQuote";
import Hours from "../components/home/Hours";
import styles from "./index.module.css";
import QuoteOfDay from "../components/home/RandomQuote";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Gray Owl Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span className={`header`}>Gray Owl Coffee</span>

      <div className="go-container with-header">
        <div className={`text-center ${styles.topic}`}>
          <FlexButton
            className={styles.topicButton}
            href="/catering"
            text="Catering"
          />
        </div>

        <div className={`text-center ${styles.topic}`}>
          <FlexButton
            className={styles.topicButton}
            href="/catering"
            text="Event Booking"
          />
        </div>
      </div>
      <footer className={`mt-1 footer`}>
        <Location className="d-inline-block" />
        <a className="mx-4" href="tel:4057012929">
          (405) 701-2929
        </a>
      </footer>
    </>
  );
}
