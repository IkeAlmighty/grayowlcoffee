import { marked } from "marked";
import S3Image from "../S3Image";
import { prettifyTime } from "../../lib/datetime";
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

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {imageKey ? <S3Image imageKey={imageKey} /> : ""}
      <div className="my-3" dangerouslySetInnerHTML={createMarkup()} />
      <div>{new Date(datetime).toLocaleDateString()}</div>
      <div>{prettifyTime(datetime)}</div>
    </div>
  );
}
