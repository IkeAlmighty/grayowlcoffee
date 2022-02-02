import { useEffect } from "react";
import S3Image from "./S3Image";

export default function MarqueeImage() {
  useEffect(() => {}, []);
  return (
    <div>
      <S3Image imageKey="marqueeimg.jpeg" />
    </div>
  );
}
