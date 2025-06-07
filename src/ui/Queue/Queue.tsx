"use client";
import {
  currentSongPlaylist,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import clsx from "clsx";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import { getSongsReturn } from "@/database/data";
import Image from "next/image";
import PlaylistInfoContext from "../trackComponent/PlaylistInfoContext";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import { useRef } from "react";
import PlaceHolderQueue from "./PlaceHolderQueue";

function Queue() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as getSongsReturn;
  const queueRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={clsx(
        "h-full  w-[20%] md:w-[25%] min-w-[250px] flex flex-col border border-neutral-200 border-opacity-15 border-y-0    max-w-[375px] overflow-y-auto"
      )}
      ref={queueRef}
    >
      <PlaceHolderQueue queueRef={queueRef} />
      {playListArray &&
        playListArray.id &&
        playListArray.songs.map((song) => (
          <div
            key={song.id}
            data-song-url={song.url}
            className="flex hover:bg-[#333333] items-stretch
          "
          >
            <ToggleElement
              url={song.url}
              songId={song.id}
              name={song.name}
              duration={song.duration}
              sege={song.sege}
              playlistSong={playListArray}
              song_time_stamp={song.song_time_stamp}
              className="w-[50px] "
            />
            <div
              className="flex-1 overflow-hidden
              flex items-center"
            >
              <Image
                src={
                  "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
                }
                width={50}
                height={50}
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
                <PlaylistInfoContext
                  songId={song.id}
                  playlistId={playListArray.id}
                  isLike={song.is_liked}
                  is_owner={playListArray.is_owner}
                >
                  <MoreOptionContext>
                    <MoreOption />
                  </MoreOptionContext>
                </PlaylistInfoContext>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Queue;
