import { useEffect, useState } from "react";
import FlexButton from "../../components/FlexButton";
import styles from "./ppalbums.module.css";

export default function PlausiblyPerfectAlbums() {
  const [albums, setAlbums] = useState([]);

  const [selectedAlbum, setSelectedAlbum] = useState(undefined);

  const [newAlbumName, setNewAlbumName] = useState("");

  const [databaseIsViewable, showDatabase] = useState(false);

  useEffect(() => {
    fetch(`/api/random/albums`)
      .then((res) => res.json())
      .then((json) => {
        setAlbums(json.albums);

        pickRandomAlbum(json.albums);
      });
  }, []);

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

  function pickRandomAlbum(explicit) {
    // if an explicit argumnent is given, treat it as the albums list
    let _albums;
    explicit ? (_albums = explicit) : (_albums = albums);

    // pick a random album
    let album;
    do {
      album = _albums[Math.floor(Math.random() * _albums.length)];
    } while (album === selectedAlbum);

    // set random album as selectedAlbum
    setSelectedAlbum(album);
  }

  function deleteAlbum(album) {
    fetch(`/api/random/deletealbum?album=${album}`, {
      method: "DELETE",
    }).then((res) => {
      setAlbums(albums.filter((a) => a !== album));
    });
  }

  return (
    <div className={styles.container}>
      <span>{selectedAlbum ? selectedAlbum : "Loading..."}</span>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          pickRandomAlbum();
        }}
      >
        <input type="submit" value="New Random Album" />
      </form>

      <FlexButton
        text="Toggle Album List"
        onClick={() => showDatabase(!databaseIsViewable)}
      />

      {databaseIsViewable && (
        <>
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

          <form>
            {albums.map((album) => (
              <div key={album} className={`${styles.dbItem}`}>
                <div className={styles.dbItemText}>{album}</div>
                <input
                  type="button"
                  value="Delete"
                  onClick={(e) => {
                    deleteAlbum(album);
                  }}
                />
              </div>
            ))}
          </form>
        </>
      )}
    </div>
  );
}
