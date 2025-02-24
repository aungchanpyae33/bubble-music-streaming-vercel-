import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

function AudioCurImg() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div
      className={clsx(
        "md:w-[200px] shrink-0 mx-auto md:mx-0   lg:w-[250px] w-[100%] sm:w-[60%] max-w-[368px]  before:block before:pt-[100%]    duration-1000 bg-green-500 rounded-md overflow-hidden relative"
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
