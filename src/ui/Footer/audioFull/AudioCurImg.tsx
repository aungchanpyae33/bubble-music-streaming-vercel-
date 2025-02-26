import clsx from "clsx";
import { useContext, useRef } from "react";
import { Context } from "./AudioFullBackGround";
import useGetDominantColor from "@/lib/GetDominantColor";
import AudioInfoImg from "./AudioInfoImg";

function AudioCurImg() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { setBgValue } = useContext(Context);
  const [isImageLoaded] = useGetDominantColor({ setBgValue, imgRef });

  return (
    <div
      className={clsx(
        "md:w-[200px] shrink-0 mx-auto md:mx-0   lg:w-[250px] w-[100%] sm:w-[60%] max-w-[485px]   before:block before:pt-[100%] bg-[#E0E0E0] rounded-md overflow-hidden relative"
      )}
    >
      <AudioInfoImg isImageLoaded={isImageLoaded} imgRef={imgRef} />
    </div>
  );
}

export default AudioCurImg;
