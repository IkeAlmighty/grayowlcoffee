import Head from "next/head";
import { useSession } from "next-auth/client";
import Location from "../components/home/Location";
import MongoField from "../components/MongoField";
import { useEffect, useState } from "react";
import S3Upload from "../components/S3Upload";
import S3Image from "../components/S3Image";
import MarkdownEditor from "../components/markdown/MarkdownEditor";

export default function Home() {
  const [session, loading] = useSession();
  const [imageKeys, setImageKeys] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Gray Owl Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span className={`header`}>Gray Owl Coffee</span>

      <div className="go-container with-header">
        {/* TODO: finish these pages and uncomment */}
        {/* <div className={`text-center ${styles.topic}`}>
          <FlexButton
            className={styles.topicButton}
            href="/catering"
            text="Catering"
          />
        </div>

        <div className={`text-center ${styles.topic}`}>
          <FlexButton
            className={styles.topicButton}
            href="/events/booking"
            text="Event Booking"
          />
        </div> */}
        <div className="my-3">
          <MarkdownEditor
            title="HELLO"
            onSave={async (payload) => {
              const body = JSON.stringify({
                query: { element: "" },
                document: {},
                collection: "",
              });
              await fetch(`/api/db/mongodb`, { method: "POST", body });
            }}
            onPublish={() => {}}
            isAdmin={session && session.isAdmin}
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
