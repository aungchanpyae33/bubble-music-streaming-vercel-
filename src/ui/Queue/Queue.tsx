"use client";
import {
  currentSongPlaylist,
  queueState,
  useOnlyOneSider,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";
import clsx from "clsx";
import { urlProp } from "../albumContainer/AudiosContainer";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";

function Queue() {
  const isQueue = useOnlyOneSider((state: queueState) => state.isQueue);
  const [playListArrayKey, playListArray] = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      Object.entries(state.playListArray as Record<string, urlProp[]>)[0] || []
  );
  const playlistUrl = {
    playlistId: playListArrayKey,
    song: playListArray,
  };
  return (
    <div
      className={clsx(
        "h-full  w-[20%] md:w-[25%] min-w-[250px] flex flex-col border border-neutral-200 border-opacity-15 border-y-0    max-w-[375px] overflow-y-auto",
        {
          hidden: !isQueue,
          "hidden sm:block": isQueue,
        }
      )}
    >
      {playListArray &&
        playListArray.map((song, index) => (
          <div key={index} className="flex hover:bg-red-800 items-center">
            <ToggleElement
              url={song.url}
              name={song.name}
              duration={song.duration}
              sege={song.sege}
              playlistUrl={playlistUrl}
              className="w-[50px]"
            />
            <div className="p-5 truncate flex-1  ">{song.name}</div>
          </div>
        ))}
    </div>
  );
}

export default Queue;
