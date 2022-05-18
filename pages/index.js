import Head from "next/head";
import Location from "../components/home/Location";
import MarqueeImage from "../components/MarqueeImage";
import EventCard from "../components/events/EventCard";
import { connectToDatabase } from "../lib/mongodb";
import Navigation from "../components/Navigation";
import FlexButton from "../components/FlexButton";
import styles from "./index.module.css";
import Image from "next/image";

export default function Home({ events }) {
  return (
    <>
      <Head>
        <title>Gray Owl Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <span className={`header`}>Gray Owl Coffee</span> */}

      <div className="with-header">
        <div className="w-full lg:w-1/2">
          <MarqueeImage />
        </div>

        {/* various doodads */}
        <div className="mx-3 text-center my-20">
          <div className="">
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

        {/* Spacer Div: */}
        <div style={{ height: "200px" }} />

        {/* event list: */}
        <div className="mx-auto w-100 container">
          <div className="row">
            {events.map((event) => (
              <div key={event._id} className="col-lg-6">
                <EventCard
                  title={event.title}
                  detailsMarkdown={event.details}
                  datetime={event.datetime}
                  imageKey={event.imageKey}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navigation />

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
    .aggregate([
      {
        $project: { _id: { $toString: "$_id" } },
      },
    ])
    .toArray();

  return { props: { events } };
}
