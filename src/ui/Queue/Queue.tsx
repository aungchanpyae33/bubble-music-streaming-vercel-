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
import { useRef } from "react";
import PlaceHolderQueue from "./PlaceHolderQueue";
import ContextInfoTrack from "../trackComponent/ContextInfoTrack";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import QueueItemContainer from "./QueueItemContainer";
import ContextLike from "../trackComponent/ContextLike";
import ArtistWrapper from "../general/ArtistWrapper";
import ToolTip from "../general/ToolTip";
function Queue() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as listSongsSection;
  const queueRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className={clsx(
        "h-full will-change-scroll   w-[20%] md:w-[25%] min-w-[250px] flex flex-col    max-w-[375px] overflow-y-auto overflow-x-hidden"
      )}
      ref={queueRef}
      // will chnage scroll for hardware acceleration , without this , it feels junky in chrome and some webkit browser
    >
      <PlaceHolderQueue queueRef={queueRef} />
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
                className="flex gap-x-2 p-2 group  hover:bg-[#333333] bg-[#222222] items-stretch
          "
              >
                <div className="w-[50px]  relative   ">
                  <div className="size-[50px] group-hover:brightness-75 relative">
                    {item.cover_url && (
                      <Image src={item.cover_url} fill alt="img" sizes="50px" />
                    )}
                  </div>
                  <ToggleElement
                    playlistSong={playListArray}
                    song={item}
                    className=" z-10  hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <div
                  className="flex-1 flex-col overflow-hidden
              flex justify-center"
                >
                  <ToolTip tooltipContent={item.name}>
                    <div
                      className="truncate
              "
                    >
                      {item.name}
                    </div>
                  </ToolTip>
                  <div className="truncate flex ">
                    <ArtistWrapper artists={item.artists} />
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
                        <MoreOption targetElement={<QueueItemContainer />} />
                      </MoreOptionContext>
                    </ContextLike>
                  </ContextInfoTrack>
                </div>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}

export default Queue;
