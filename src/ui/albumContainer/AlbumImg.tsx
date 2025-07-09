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
      className=" lg:w-[250px] rounded overflow-hidden md:w-[200px] shrink-0 w-[180px]  aspect-square  object-cover relative bg-[#343333]
    "
    >
      <Image
        className={clsx("transition-opacity duration-1000", {
          "opacity-0": isImageLoaded === "initial",
          "opacity-100": isImageLoaded === "success",
        })}
        ref={imgRef}
        src={
          "https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
        }
        priority={true}
        sizes="(min-width: 1024px) 250px, (min-width: 768px) 200px, 180px"
        fill
        alt="singer song"
      />
    </div>
  );
}

export default AlbumImg;
