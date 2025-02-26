import clsx from "clsx";
import Image from "next/image";
import { RefObject, useState } from "react";
interface Props {
  imgRef: RefObject<HTMLImageElement | null>;
  isImageLoaded: boolean;
}
function AudioInfoImg({ imgRef, isImageLoaded }: Props) {
  const [isErrorImg, setIsErrorImg] = useState(false);
  return (
    <>
      <Image
        ref={imgRef}
        className={clsx("transition-opacity duration-1000", {
          "opacity-0": !isImageLoaded,
          "opacity-100": isImageLoaded,
        })}
        src={
          "https://s3.tebi.io/test1345/premium_photo-1690406382383-3827c1397c48%20%281%29%20%285%29.jpg"
        }
        alt="this is image element"
        fill
        onError={(e) => {
          setIsErrorImg(true);
        }}
      />
      {isErrorImg && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 whitespace-nowrap    -translate-x-1/2">
          some image to show
        </div>
      )}
    </>
  );
}

export default AudioInfoImg;
