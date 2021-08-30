import { useEffect, useState } from "react";
import FlexButton from "../../components/FlexButton";
import styles from "./ppalbums.module.css";

export default function PlausiblyPerfectAlbums() {
  const [albums, setAlbums] = useState([]);

  const [selectedAlbum, setSelectedAlbum] = useState(undefined);

  const [newAlbumName, setNewAlbumName] = useState("");

  useEffect(() => {
    fetch(`/api/random/albums`)
      .then((res) => res.json())
      .then((json) => {
        setAlbums(json.albums);

        pickRandomAlbum(json.albums);
      });
  }, []);

  function pickRandomAlbum(explicit) {
    // if an explicit argumnent is given, treat it as the albums list
    let _albums;
    explicit ? (_albums = explicit) : (_albums = albums);

    // pick a random album
    let album;
    do {
      album = _albums[Math.floor(Math.random() * _albums.length)];
    } while (album === selectedAlbum && albums.length > 1);

    // set random album as selectedAlbum
    setSelectedAlbum(album);
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
        text="Edit Album Database List"
        href="/random/ppalbums-edit"
      />
    </div>
  );
}
