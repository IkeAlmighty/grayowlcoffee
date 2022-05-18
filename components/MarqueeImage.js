import Image from "next/image";

export default function MarqueeImage() {
  return (
    <div className="overflow-hidden rounded-md">
      <Image
        src="/marqueeimg.jpeg"
        layout="responsive"
        width={993}
        height={510}
        alt=""
      />
    </div>
  );
}
