"use client";
import {
  currentSongPlaylist,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";
import clsx from "clsx";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import { getSongsReturn } from "@/database/data";
import Image from "next/image";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import { useRef } from "react";
import PlaceHolderQueue from "./PlaceHolderQueue";
import TrackItemContainer from "../trackComponent/TrackItemContainer";
import ContextInfoTrack from "../trackComponent/ContextInfoTrack";

function Queue() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as getSongsReturn;
  const queueRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={clsx(
        "h-full  w-[20%] md:w-[25%] min-w-[250px] flex flex-col border border-neutral-200 border-opacity-15 border-y-0     max-w-[375px] overflow-y-auto"
      )}
      ref={queueRef}
    >
      <PlaceHolderQueue queueRef={queueRef} />
      {playListArray &&
        playListArray.id &&
        playListArray.songs.map((song) => (
          <div
            key={playListArray.might_repeat ? song.uni_id : song.id}
            data-song-url={song.url}
            className="flex py-1  hover:bg-[#333333] items-stretch
          "
          >
            <ToggleElement
              playlistSong={playListArray}
              song={song}
              className="w-[50px] "
            />
            <div
              className="flex-1 overflow-hidden
              flex gap-2 items-center"
            >
              <Image
                src={
                  "https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
                }
                width={50}
                height={50}
                className=" rounded"
                alt="test image"
                priority={true}
              />
              <div
                className=" flex-1 truncate
              "
              >
                {song.name}
              </div>
              <div className="w-[30px]">
                <ContextInfoTrack
                  id={playListArray!.id!}
                  source={playListArray?.source || "none"}
                  song={song}
                >
                  <MoreOptionContext>
                    <MoreOption targetElement={<TrackItemContainer />} />
                  </MoreOptionContext>
                </ContextInfoTrack>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Queue;
