import { useEffect, useState } from "react";
import { fetchImageURL } from "../lib/s3";
export default function S3Image({ imageKey, alt, className, style }) {
  const [url, setURL] = useState("");

  useEffect(async () => {
    const { url } = await fetchImageURL(imageKey);
    setURL(url);
  }, [imageKey]);

  return (
    <img
      src={url}
      alt={alt ? alt : "image did not load"}
      className={className}
      style={style}
    />
  );
}
