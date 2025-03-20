import clsx from "clsx";
import { useContext, useRef } from "react";
import { Context } from "./AudioFullBackGround";
import useGetDominantColor from "@/lib/GetDominantColor";
import Image from "next/image";

function AudioCurImg() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { setBgValue } = useContext(Context);
  const [isImageLoaded] = useGetDominantColor({ setBgValue, imgRef });
  return (
    <div
      className={clsx(
        " lg:h-[270px] h-[80%]  max-h-[90vw]  mx-auto lg:mx-0 aspect-square shrink-0  fallbackAspect bg-[#343333] short:opacity-0 short:absolute  overflow-hidden relative"
      )}
    >
      <Image
        ref={imgRef}
        className={clsx("transition-opacity duration-300", {
          "opacity-0": isImageLoaded === "initial",
          "opacity-100": isImageLoaded === "success",
        })}
        src={
          "https://s3.tebi.io/test1345/premium_photo-1690406382383-3827c1397c48%20%281%29%20%285%29.jpg"
        }
        alt="this is image element"
        fill
      />
      {isImageLoaded === "error" && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 whitespace-nowrap    -translate-x-1/2">
          some image to show image
        </div>
      )}
    </div>
  );
}

export default AudioCurImg;
