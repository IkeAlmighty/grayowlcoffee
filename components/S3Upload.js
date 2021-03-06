import { useRef } from "react";
import { uploadImage } from "../lib/s3";

export default function S3Upload({ label, onUpload, className }) {
  const fileupload = useRef(null);
  return (
    <>
      {/* Because it's hard to style file inputs, we use a button input
      as a proxy and hide the actual file input: */}
      <input
        className={className}
        type="button"
        value={label ? label : "Upload Image"}
        onClick={() => {
          fileupload.current.click();
        }}
      />
      <input
        style={{ display: "none" }}
        ref={fileupload}
        type="file"
        accept="image/png, image/jpeg"
        onChange={async (e) => {
          let res = await uploadImage(e);
          if (res.ok) {
            onUpload(e.target.value.split("\\").pop());
          }
        }}
      />
    </>
  );
}
