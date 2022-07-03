import Head from "next/head";
import Location from "../components/home/Location";
import MarqueeImage from "../components/MarqueeImage";
import EventCard from "../components/events/EventCard";
import { connectToDatabase } from "../lib/mongodb";
import Navigation from "../components/Navigation";
import FlexButton from "../components/FlexButton";
import styles from "./index.module.css";
import Image from "next/image";
import { getSession } from "../lib/auth";

export default function Home({ events, session }) {
  return (
    <>
      <Head>
        <title>Gray Owl Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="with-header grid grid-cols-1 lg:grid-cols-2">
        <div className="overflow-hidden rounded-md">
          <Image
            src="/marqueeimg.jpeg"
            layout="responsive"
            width={993}
            height={510}
            alt=""
          />
        </div>

        {/* Catering */}
        <div className="m-auto w-full text-center my-20">
          <div className="w-[100px] inline-block overflow-hidden rounded">
            <Image
              src="/phone.gif"
              layout="responsive"
              width={40}
              height={40}
              alt=""
            />
          </div>
          <div className="text-2xl">
            <a className="text-4xl" href="tel:4057012929">
              Call Us
            </a>{" "}
            to make a catering order.
          </div>
        </div>
      </div>

      {/* event list: */}

      <div className="mx-auto max-w-[400px] my-20">
        <h2 className="text-center">Events</h2>
        {events.map((event) => (
          <div className="" key={JSON.stringify(event)}>
            <EventCard
              title={event.title}
              detailsMarkdown={event.details}
              datetime={event.datetime}
              imageKey={event.imageKey}
            />
          </div>
        ))}
      </div>

      <Navigation session={session} />

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

  const session = getSession(context);

  return { props: { events, session } };
}
