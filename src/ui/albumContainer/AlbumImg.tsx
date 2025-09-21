"use client";

import useGetDominantColor from "@/lib/GetDominantColor";
import Image from "next/image";
import { useContext, useRef } from "react";
import { ContextAlbum } from "./AlbumUpperBackground";
import { listInfo } from "@/database/data";
import IconWrapper from "../general/IconWrapper";
import { Folder } from "lucide-react";

function AlbumImg({
  cover_url,
  type,
}: {
  cover_url: string | null;
  type: listInfo["type"];
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { setBgValue } = useContext(ContextAlbum);
  useGetDominantColor({ setBgValue, imgRef, cover_url });
  return (
    <div
      className=" lg:w-[250px] rounded overflow-hidden md:w-[200px] shrink-0 w-[180px]  aspect-square  object-cover relative bg-[#222222]
    "
    >
      {cover_url ? (
        <Image
          ref={imgRef}
          src={cover_url}
          priority={true}
          sizes="(min-width: 1024px) 250px, (min-width: 768px) 200px, 180px"
          fill
          alt="singer song"
        />
      ) : type === "playlist" ? (
        <div className=" absolute inset-0 flex items-center justify-center">
          <IconWrapper
            Icon={Folder}
            className="hover:scale-100   active:scale-100 size-[100px]"
          />
        </div>
      ) : null}
    </div>
  );
}

export default AlbumImg;
