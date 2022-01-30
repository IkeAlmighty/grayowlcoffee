import { useEffect, useState } from "react";

export default function Spotify() {
  const [currentSong, setCurrentSong] = useState(undefined);
  useEffect(async () => {
    let res = await fetch("/api/spotify/authorize");
    let token = await res.text();

    console.log(`Bearer ${token}`);

    // call the client side api:
    let res2 = await fetch(
      "https://api.spotify.com/v1/124248742/player/currently-playing",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(await res2.json());
  }, [currentSong]);
  return (
    <div>{currentSong ? currentSong : "No music playing right now! :)"}</div>
  );
}
