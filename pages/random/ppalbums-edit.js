import { useEffect, useState } from "react";
import FlexButton from "../../components/FlexButton";
import styles from "./ppalbums-edit.module.css";

export default function EditPPAlbums() {
  const [albums, setAlbums] = useState([]);

  const [newAlbumName, setNewAlbumName] = useState("");
  useEffect(() => {
    fetch(`/api/random/albums`)
      .then((res) => res.json())
      .then((json) => {
        setAlbums(json.albums);
      });
  }, []);

  function deleteAlbum(album) {
    fetch(`/api/random/deletealbum?album=${album}`, {
      method: "DELETE",
    }).then((res) => {
      setAlbums(albums.filter((a) => a !== album));
    });
  }

  function submitNewAlbum() {
    if (newAlbumName.trim() === "") return;

    console.log(newAlbumName, "< new album name");

    fetch("/api/random/addalbum", {
      method: "POST",
      body: JSON.stringify({ album: newAlbumName }),
    }).then((res) => {
      setNewAlbumName("");
      setAlbums([newAlbumName, ...albums]);
    });
  }
  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitNewAlbum();
        }}
      >
        <input
          type="text"
          placeholder="add a new album..."
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
        />
        <input type="submit" value="Add Album to Database" />
      </form>

      <div>
        {albums.map((album) => (
          <div key={album} className={`${styles.dbItem}`}>
            <div className={styles.dbItemText}>{album}</div>
            <div className="text-right">
              <FlexButton
                text="Delete"
                onClick={(e) => {
                  deleteAlbum(album);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
