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
import ContextInfoTrack from "../trackComponent/ContextInfoTrack";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import QueueItemContainer from "./QueueItemContainer";
function Queue() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as getSongsReturn;
  const queueRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className={clsx(
        "h-full [transform:translateZ(0)]   w-[20%] md:w-[25%] min-w-[250px] flex flex-col translate-3d  max-w-[375px] overflow-y-auto overflow-x-hidden"
      )}
      ref={queueRef}
      // [transform:translateZ(0)] for hardware acceleration , without this , it feels junky in chrome and some webkit browser
    >
      <PlaceHolderQueue queueRef={queueRef} />
      <AnimatePresence initial={false}>
        {playListArray &&
          playListArray.id &&
          playListArray.songs.map((song) => (
            <motion.div
              layout="position"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              key={song.uni_id + song.id}
              data-song-id={song.uni_id + song.id}
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
              flex gap-2 size-[50px] bg-[#333333] items-center"
              >
                <Image
                  src={
                    "https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
                  }
                  width={50}
                  height={50}
                  className=" rounded"
                  alt="test image"
                  priority={false}
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
                      <MoreOption targetElement={<QueueItemContainer />} />
                    </MoreOptionContext>
                  </ContextInfoTrack>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default Queue;
