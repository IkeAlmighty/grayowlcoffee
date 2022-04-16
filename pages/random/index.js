import { useEffect } from "react";

// NOTE: This is here (instead of the config file)
// for a place to aggregate all the future 'random'
// pages.

export default function Random() {
  useEffect(() => {
    document.location = "/random/ppalbums";
  }, []);
  return <div></div>;
}
