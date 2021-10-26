import { uploadImage } from "../lib/s3";

export default function S3Upload({ label, onUpload, className, style }) {
  return (
    <div className={className} style={style ? style : { padding: "10px" }}>
      {label ? <span>{label}</span> : ""}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={async (e) => {
          let res = await uploadImage(e);
          if (res.ok) {
            onUpload(e.target.value.split("\\").pop());
          }
        }}
      />
    </div>
  );
}
