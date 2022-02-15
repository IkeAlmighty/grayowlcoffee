import { useState, useEffect, useRef } from "react";
import EventCard from "../../components/EventCard";
import S3Upload from "../../components/S3Upload";
import styles from "./events.module.css";

export default function Events() {
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [imageKey, setImageKey] = useState("");

  const detailsInput = useRef();
  const titleInput = useRef();
  const datetimeInput = useRef();

  const [events, setEvents] = useState([]);
  useEffect(async () => {
    let res = await fetch("/api/db/events", {
      method: "GET",
    });
    setEvents(await res.json());
  }, []);

  async function createEvent(e) {
    e.preventDefault();
    const event = { details, title, datetime, imageKey };

    let res = await fetch("/api/db/events", {
      method: "POST",
      body: JSON.stringify({ event }),
    });

    const text = await res.text();
    if (res.status !== 201 && text) {
      alert(text);
    }

    if (res.status === 201) {
      setEvents([...events, event]);
      titleInput.current.value = "";
      detailsInput.current.value = "";
      datetimeInput.current.value = "";
      setImageKey("");
      setDetails("");
      setTitle("");
      setDatetime("");
    }
  }

  async function deleteEvent(event) {
    let res = await fetch("/api/db/events", {
      method: "DELETE",
      body: JSON.stringify({ event }),
    });

    if (res.status === 201) {
      setEvents(
        events.filter((e) => JSON.stringify(event) !== JSON.stringify(e))
      );
    }
  }

  return (
    <div className="go-container mx-auto my-3 px-3">
      <h2>Publish an Event</h2>
      <hr />
      <form className="container" onSubmit={(e) => createEvent(e)}>
        <div className="row my-3">
          <label className="col-sm my-auto">Title</label>

          <input
            ref={titleInput}
            className="col-sm"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="row my-3">
          <label className="col-sm my-auto">Details</label>

          <textarea
            ref={detailsInput}
            className="col-sm"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="row my-3">
          <label className="col-sm my-auto">Date</label>

          <input
            ref={datetimeInput}
            className="col-sm"
            type="datetime-local"
            onChange={(e) => {
              setDatetime(e.target.value);
            }}
          />
        </div>

        <div className="row my-3">
          <label className="col-sm my-auto">Upload an Image: </label>

          <S3Upload
            className="col-sm"
            onUpload={(imageKey) => setImageKey(imageKey)}
          />
        </div>

        <input type="submit" value="Create Event" />
      </form>
      <h2 className="mt-3">Preview</h2>
      <div className={styles.cardContainer}>
        <EventCard
          title={title}
          detailsMarkdown={details}
          datetime={datetime}
          imageKey={imageKey}
        />
      </div>

      <div style={{ height: "100px" }} />
      <h1 className="mt-3">Events Published</h1>
      <hr />
      <div className="mx-auto">
        {events.map((event) => (
          <div className={styles.cardContainer}>
            <EventCard
              key={JSON.stringify(event)}
              title={event.title}
              detailsMarkdown={event.details}
              datetime={event.datetime}
              imageKey={event.imageKey}
            />
            <input
              type="button"
              value="Delete"
              onClick={() => deleteEvent(event)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
