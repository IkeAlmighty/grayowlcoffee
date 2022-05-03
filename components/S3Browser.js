// displays a panel of all the images in the S3 bucket.
// onClick, the custom onSelect function is called, with
// an argument of the image URL of the image clicked.
// ex
// <S3Browser onSelect=(url)=>{/* code goes here */} />

import { useEffect, useState } from "react";
import { deleteImage, listObjectKeys } from "../lib/s3";
import S3Image from "./S3Image";
import S3Upload from "./S3Upload";

export default function S3Browser({ onSelect, buttonValue, className }) {
  const [imageKeys, setImageKeys] = useState([]);

  function addImageKey(imageKey) {
    setImageKeys([imageKey, ...imageKeys]);
  }

  useEffect(() => {
    async function fetchAndSetObjectKeys() {
      const keys = await listObjectKeys(); // list up to 1000 image keys
      setImageKeys(keys);
    }

    fetchAndSetObjectKeys();
  }, []);

  return (
    <div className={className}>
      <S3Upload label="Upload New Image" onUpload={addImageKey} />
      {imageKeys.map((key) => (
        <div key={key}>
          <S3Image imageKey={key} style={{ width: "100%" }} />
          <div style={{ textOverflow: "ellipsis" }}>{key}</div>
          <input
            type="button"
            value={buttonValue ? buttonValue : "Use Image"}
            onClick={() => {
              onSelect(key);
            }}
            style={{ float: "left" }}
          />
          <input
            type="button"
            value="Delete Image"
            onClick={async () => {
              const res = await deleteImage(key);
              if (res.ok) {
                setImageKeys(imageKeys.filter((k) => key !== k));
              }
            }}
            style={{ float: "right" }}
          />
        </div>
      ))}
    </div>
  );
}
