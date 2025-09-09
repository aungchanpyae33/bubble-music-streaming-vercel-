"use client";

import useGetDominantColor from "@/lib/GetDominantColor";
import Image from "next/image";
import { useContext, useRef } from "react";
import { ContextAlbum } from "./AlbumUpperBackground";

function AlbumImg({ cover_url }: { cover_url: string | null }) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { setBgValue } = useContext(ContextAlbum);
  useGetDominantColor({ setBgValue, imgRef, cover_url });
  return (
    <div
      className=" lg:w-[250px] rounded overflow-hidden md:w-[200px] shrink-0 w-[180px]  aspect-square  object-cover relative bg-[#222222]
    "
    >
      {cover_url && (
        <Image
          ref={imgRef}
          src={cover_url}
          priority={true}
          sizes="(min-width: 1024px) 250px, (min-width: 768px) 200px, 180px"
          fill
          alt="singer song"
        />
      )}
    </div>
  );
}

export default AlbumImg;
