"use client";
import {
  currentSongPlaylist,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";
import clsx from "clsx";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import { listSongsSection } from "@/database/data";
import Image from "next/image";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import { useContext, useRef } from "react";
import PlaceHolderQueue from "./PlaceHolderQueue";
import ContextInfoTrack from "../trackComponent/ContextInfoTrack";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import QueueItemContainer from "./QueueItemContainer";
import ContextLike from "../trackComponent/ContextLike";
import { AudioFullRefContext } from "../Footer/audioFull/ContextAudioFullRef";
function QueueFull() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as listSongsSection;
  const queueRef = useRef<HTMLDivElement | null>(null);
  const { audioFullRef } = useContext(AudioFullRefContext);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "overflow-auto relative no-scrollbar will-change-scroll my-2   flex-1 "
      )}
      ref={queueRef}
    >
      <PlaceHolderQueue queueRef={queueRef} />
      <div>
        <AnimatePresence initial={false}>
          {playListArray &&
            playListArray.idArray &&
            playListArray.idArray.map((id) => {
              const item = playListArray.songs[`${id}`];
              return (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  key={item.id}
                  data-id={item.id}
                  className="flex p-2 group  hover:bg-[#333333] items-stretch
          "
                >
                  <div className="w-[50px]  relative   ">
                    <div className="size-[50px] group-hover:brightness-75 relative">
                      <Image
                        src="https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
                        fill
                        alt="img"
                        sizes="50px"
                      />
                    </div>
                    <ToggleElement
                      playlistSong={playListArray}
                      song={item}
                      className=" z-10  hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div
                    className="flex-1 overflow-hidden
              flex   items-center"
                  >
                    <div
                      className="truncate
              "
                    >
                      {item.name}
                    </div>
                  </div>
                  <div className="w-[30px] flex items-center">
                    <ContextInfoTrack
                      id={undefined}
                      source={undefined}
                      song={item}
                    >
                      <ContextLike like={item.is_liked} id={item.song_id}>
                        <MoreOptionContext>
                          <MoreOption
                            relativeRoot={audioFullRef.current}
                            targetElement={<QueueItemContainer />}
                          />
                        </MoreOptionContext>
                      </ContextLike>
                    </ContextInfoTrack>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default QueueFull;
