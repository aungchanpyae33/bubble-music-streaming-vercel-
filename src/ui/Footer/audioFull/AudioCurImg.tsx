import clsx from "clsx";
import Image from "next/image";
import { ContextBackGround } from "./AudioFullBackGround";
import { useContext, useRef } from "react";
import useGetDominantColor from "@/lib/GetDominantColor";
import { DataContext } from "@/lib/MediaSource/ContextMedia";

function AudioCurImg() {
  const { cover_url } = useContext(DataContext);
  const { setBgValue } = useContext(ContextBackGround);
  const imgRef = useRef<HTMLImageElement | null>(null);
  useGetDominantColor({ setBgValue, imgRef, cover_url });
  return (
    <div
      className={clsx(
        " lg:h-[270px] h-[100%]  mx-auto lg:mx-0 aspect-square shrink-0 grow-0 fallbackAspect bg-[#343333] short:opacity-0 short:absolute  overflow-hidden relative"
      )}
    >
      {cover_url && (
        <Image
          ref={imgRef}
          src={cover_url}
          sizes="300px"
          alt="this is image element"
          fill
        />
      )}

      {/* {isImageLoaded === "error" && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 whitespace-nowrap    -translate-x-1/2">
          some image to show image
        </div>
      )} */}
    </div>
  );
}

export default AudioCurImg;
