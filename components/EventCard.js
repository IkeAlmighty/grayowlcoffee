import { marked } from "marked";
import S3Image from "./S3Image";
import styles from "./EventCard.module.css";

export default function EventCard({
  title,
  detailsMarkdown,
  imageKey,
  datetime,
}) {
  function createMarkup() {
    return { __html: detailsMarkdown ? marked(detailsMarkdown) : "" };
  }

  function prettifyTime() {
    if (!datetime) return "Invalid Time";
    const date = new Date(datetime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let pmAm = hours > 12 ? "pm" : "am";
    return `${hours % 12}:${minutes}${pmAm}`;
  }

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {imageKey ? <S3Image imageKey={imageKey} /> : ""}
      <div dangerouslySetInnerHTML={createMarkup()} />
      <div>{new Date(datetime).toLocaleDateString()}</div>
      <div>{prettifyTime()}</div>
    </div>
  );
}
