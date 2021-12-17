import S3Image from "../../components/S3Image";
import S3Upload from "../../components/S3Upload";
import styles from "./CateringItem.module.css";
import { useSession } from "next-auth/client";
import { useState } from "react";

export default function CateringItem({ item }) {
  const [session, loading] = useSession();
  const [imageKey, setImageKey] = useState(item.imageKey);

  async function updateImageKey(newImageKey) {
    setImageKey(newImageKey);
    const body = JSON.stringify({
      collection: "catering-items",
      query: { _id: item._id },
      field: "imageKey",
      value: newImageKey,
    });
    await fetch(`/api/db/mongodb`, { method: "POST", body });
  }

  return (
    <div className={styles.cateringItem}>
      {
        <S3Image
          className="text-center"
          imageKey={imageKey ? imageKey : undefined}
        />
      }
      {item.name} | ${item.price.toFixed(2)}
      {session && session.isAdmin && (
        <S3Upload
          onUpload={(newImageKey) => {
            updateImageKey(newImageKey);
          }}
          className={styles.cateringItemUploadButton}
        />
      )}
    </div>
  );
}
