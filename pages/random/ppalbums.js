import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import FlexButton from "../../components/FlexButton";
import styles from "./ppalbums.module.css";

export default function PlausiblyPerfectAlbums() {
  const [session, loading] = useSession();

  const [albums, setAlbums] = useState([]);

  const [selectedAlbum, setSelectedAlbum] = useState(undefined);

  //TODO: this should all be moved to getServerSideProps
  async function fetchAndInit() {
    const apiRepsonse = await fetch(`/api/random/albums`);
    const json = await apiRepsonse.json();
    setAlbums(json.albums);
    pickRandomAlbum(json.albums);
  }

  useEffect(() => {
    fetchAndInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        text={`${session?.isAdmin ? "Edit" : "View"} Album Database List`}
        href="/random/ppalbums-edit"
      />
    </div>
  );
}
