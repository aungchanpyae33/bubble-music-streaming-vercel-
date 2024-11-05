"use client";
import ArrowNavi from "@/lib/Accessibility/ArrowNavi";
import Track from "../trackComponent/Track";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { currentPlayList } from "@/lib/zustand";
export interface urlProp {
  urlSong: string;
  duration: number;
  sege: number;
  name: string;
}
function AudiosContainer({
  url,
  description,
}: {
  url: urlProp[];
  description: string;
}) {
  const dataInc = useRef(0);
  const rowCell = useRef(1);
  const setPlayListArray = currentPlayList(
    (state: any) => state.setPlayListArray
  );

  useEffect(() => {
    setPlayListArray(url);
  }, [setPlayListArray, url]);
  return (
    <div>
      <div className="Container w-full flex">
        <Image
          src={
            "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
          }
          sizes="(min-width: 1940px) 250px, (min-width: 1040px) calc(12.61vw + 8px), (min-width: 780px) calc(18.33vw - 12px), (min-width: 700px) calc(20vw - 10px), 115px"
          priority={false}
          className="w-[20%] md:w-[18%] lg:w-[14%] min-w-[120px] max-w-[250px] h-full object-cover"
          width={300}
          height={300}
          alt="singer song"
        />

        <div className="bg-red-300 pt-2 flex-1 pl-10 ">
          <h1 className="text-blue-500">playlist</h1>
          <h1 className="text-3xl">{description}</h1>
          <span className="text-white">by Bubble</span>
        </div>
      </div>
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          ArrowNavi(e, dataInc, "ArrowDown", "ArrowUp", url.length, "cell");
        }}
      >
        {url.map((item, index) => (
          <Track
            key={item.urlSong}
            name={url[index].name}
            duration={url[index].duration}
            index={index}
            roleCell={rowCell}
            dataInc={dataInc}
            sege={url[index].sege}
            url={url[index].urlSong}
          />
        ))}
      </div>
    </div>
  );
}

export default AudiosContainer;
