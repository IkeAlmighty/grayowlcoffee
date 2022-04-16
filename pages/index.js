import Head from "next/head";
import Location from "../components/home/Location";
import MarqueeImage from "../components/MarqueeImage";
import EventCard from "../components/EventCard";
import { connectToDatabase } from "../lib/mongodb";
import Navigation from "../components/Navigation";
import FlexButton from "../components/FlexButton";
import styles from "./index.module.css";

export default function Home({ events }) {
  return (
    <>
      <Head>
        <title>Gray Owl Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <span className={`header`}>Gray Owl Coffee</span> */}
      <Navigation />
      <div className="go-container with-header">
        <MarqueeImage />
        <hr />

        {/* various doodads */}
        <div className="mx-3 text-center">
          {/* <h1 className="mt-3">Catering Menu</h1> */}
          {/* <S3Image imageKey={"catering-menu.jpeg"} /> */}
          <div className={`${styles.cateringContainer}`}>
            <a href="tel:4057012929">Call Us</a> to make a catering order.
          </div>

          <h3>Random Owlian Things</h3>
          <FlexButton
            className="my-3"
            href="/random/ppalbums"
            text="'Plausibly Perfect' Albums"
          />
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
