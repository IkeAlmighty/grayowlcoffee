import Head from "next/head";
import { useSession } from "next-auth/client";
import Location from "../components/home/Location";
import MarqueeImage from "../components/MarqueeImage";
import EventCard from "../components/EventCard";
import { connectToDatabase } from "../lib/mongodb";
import Navigation from "../components/Navigation";

export default function Home({ events }) {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Gray Owl Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span className={`header`}>Gray Owl Coffee</span>
      {/* <Navigation /> */}
      <div className="go-container with-header">
        <MarqueeImage />

        {/* event list: */}
        <div className="mx-auto w-100">
          {events.map((event) => (
            <EventCard
              title={event.title}
              detailsMarkdown={event.details}
              datetime={event.datetime}
              imageKey={event.imageKey}
            />
          ))}
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

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const events = await db
    .collection("events")
    .find({})
    .project({ _id: 0 })
    .toArray();

  return { props: { events } };
}
