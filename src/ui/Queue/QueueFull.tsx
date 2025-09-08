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
        "overflow-auto relative no-scrollbar will-change-scroll my-2  flex-1 "
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
                  className="flex py-1  hover:bg-[#333333] items-stretch
          "
                >
                  <ToggleElement
                    playlistSong={playListArray}
                    song={item}
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
                      {item.name}
                    </div>
                    <div className="w-[30px]">
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
