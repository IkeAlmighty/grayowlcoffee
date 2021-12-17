import Head from "next/head";
import { useEffect, useState } from "react";
import CateringItem from "../../components/catering/CateringItem";
import CreateItemModel from "../../components/catering/CreateItemModal";
import S3Browser from "../../components/S3Browser";
import S3Image from "../../components/S3Image";
import S3Upload from "../../components/S3Upload";
import Authorized from "../../components/Authorized";
import styles from "./styles.module.css";

export default function Catering({}) {
  const [order, setOrder] = useState([
    "THIS IS A TEST. IGNORE ME, SORRY",
    "LALALALA",
  ]);

  const [available, setAvailable] = useState([]);
  const [showItemCreator, setShowItemCreator] = useState(false);
  const [newItem, setNewItem] = useState({});

  function createItem(e) {}

  function formatOrder() {
    let message = order.reduce((prev, curr) => {
      return prev + "\n" + curr;
    }, "");

    return message;
  }

  async function sendBakingRequestToSlack() {
    await fetch(`/api/slack/catering`, {
      method: "POST",
      body: JSON.stringify({ message: formatOrder(), channel: "testing" }),
    });
  }

  async function getCateringItems() {
    let items = await fetch(`/api/db/mongodb?collection=catering-items`);

    return await items.json();
  }

  useEffect(async () => {
    let items = await getCateringItems();
    setAvailable(items);
  }, []);

  return (
    <>
      <Head>
        <title>Catering | Gray Owl Coffee</title>
      </Head>

      <div className="go-container with-header text-center pt-3">
        <input
          className="d-block mx-auto"
          type="button"
          value="Create New Item..."
          onClick={() => {
            setShowItemCreator(true);
          }}
        />
        {available.map((item) => {
          return (
            <CateringItem
              key={item._id}
              item={item}
              imageKey={item.imageKey ? item.imageKey : undefined}
            />
          );
        })}
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
            sendBakingRequestToSlack();
          }}
        >
          <input type="tel" placeholder="Your Phone #" />
          <input type="text" placeholder="Your Name" />
          <input type="submit" value="Request Catering Order" />
        </form> */}
      </div>

      {/* the header has to be placed at the end so that it covers other elements on scroll: */}
      <span className={`header`}>Catering | Gray Owl Coffee</span>
      <footer className={`mt-1 footer`}>
        <a className="m-1" href="tel:4057012929">
          (405) 701-2929
        </a>{" "}
        for questions
      </footer>

      <Authorized>
        <CreateItemModel onCancel={() => {}} />
      </Authorized>
    </>
  );
}
