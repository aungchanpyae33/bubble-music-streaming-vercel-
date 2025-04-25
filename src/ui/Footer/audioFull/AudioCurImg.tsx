import clsx from "clsx";
import Image from "next/image";
import { ContextBackGround } from "./AudioFullBackGround";
import { useContext, useRef } from "react";
import useGetDominantColor from "@/lib/GetDominantColor";

function AudioCurImg() {
  const { setBgValue } = useContext(ContextBackGround);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isImageLoaded] = useGetDominantColor({ setBgValue, imgRef });
  return (
    <div
      className={clsx(
        " lg:h-[270px] h-[100%]  mx-auto lg:mx-0 aspect-square shrink-0 grow-0 fallbackAspect bg-[#343333] short:opacity-0 short:absolute  overflow-hidden relative"
      )}
    >
      <Image
        ref={imgRef}
        src={
          "https://s3.tebi.io/test1345/photo-1739467372234-2aba33f6b7ee.avif"
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
