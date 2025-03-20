"use client";

import useGetDominantColor from "@/lib/GetDominantColor";
import Image from "next/image";
import { useContext, useRef } from "react";
import { ContextAlbum } from "./AlbumUpperBackground";
import clsx from "clsx";

function AlbumImg() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { setBgValue } = useContext(ContextAlbum);
  const [isImageLoaded] = useGetDominantColor({ setBgValue, imgRef });
  return (
    <div
      className=" lg:w-[250px] md:w-[200px] w-[180px]  aspect-square  object-cover relative bg-[#343333]
    "
    >
      <Image
        className={clsx("transition-opacity duration-1000", {
          "opacity-0": isImageLoaded === "initial",
          "opacity-100": isImageLoaded === "success",
        })}
        ref={imgRef}
        src={
          "https://s3.tebi.io/test1345/photo-1739467372234-2aba33f6b7ee.avif"
        }
        // sizes="(min-width: 1940px) 250px, (min-width: 1040px) calc(12.61vw + 8px), (min-width: 780px) calc(18.33vw - 12px), (min-width: 700px) calc(20vw - 10px), 115px"
        priority={false}
        fill
        alt="singer song"
      />
    </div>
  );
}

export default AlbumImg;
