import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

function AudioCurImg() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div
      className={clsx(
        "w-[300px] h-[300px] duration-1000 bg-green-500 relative "
      )}
    >
      <Image
        className={clsx("transition-opacity duration-1000", {
          "opacity-0": !isImageLoaded,
          "opacity-100": isImageLoaded,
        })}
        src={
          "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
        }
        alt="this is image element"
        fill
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
}

export default AudioCurImg;
