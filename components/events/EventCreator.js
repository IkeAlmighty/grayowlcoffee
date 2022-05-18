import { useState, useEffect, useRef } from "react";
import EventCard from "./EventCard";
import S3Upload from "../S3Upload";
import styles from "./EventCreator.module.css";

export default function EventCreator() {
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [imageKey, setImageKey] = useState("");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchAndSetEvents() {
      let res = await fetch("/api/db/events", {
        method: "GET",
      });
      setEvents(await res.json());
    }

    fetchAndSetEvents();
  }, []);

  async function createEvent() {
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

      // clear fields:
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
    <div>
      <h2>Publish a Shop Event</h2>
      <hr />
      <div onSubmit={(e) => e.preventDefault()}>
        <div className="my-6">
          <div>Title</div>
          <input
            className="w-full"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="my-6">
          <div>Details</div>
          <textarea
            className="h-[200px] w-full p-3 text-lg"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="my-6">
          <div>Date</div>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>

        <div className="my-6">
          <S3Upload onUpload={(imageKey) => setImageKey(imageKey)} />
        </div>

        <div className="my-6 text-3xl">
          <span className="text-button" onClick={() => createEvent()}>
            Create Event
          </span>
        </div>
      </div>

      <h2>Preview</h2>
      <div>
        <EventCard
          title={title}
          detailsMarkdown={details}
          datetime={datetime}
          imageKey={imageKey}
        />
      </div>

      <div />
      <h1 className="mt-20">Events Published</h1>
      <hr />
      <div>
        {events.map((event) => (
          <div key={JSON.stringify(event)}>
            <EventCard
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

      {events.length === 0 && (
        <div className="my-20">Nothing Goin&apos; On Here...</div>
      )}
    </div>
  );
}
