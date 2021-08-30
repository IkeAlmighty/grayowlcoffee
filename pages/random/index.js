import { useEffect } from "react";

export default () => {
  useEffect(() => {
    document.location = "/random/ppalbums";
  }, []);
  return <div></div>;
};
