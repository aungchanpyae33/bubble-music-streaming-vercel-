"use client";
import {
  currentSongPlaylist,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import clsx from "clsx";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import { listSongsSection } from "@/database/data";
import Image from "next/image";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import { useContext, useRef } from "react";
import ContextInfoTrack from "../trackComponent/ContextInfoTrack";
import { AudioFullRefContext } from "../Footer/audioFull/ContextAudioFullRef";
import ArtistWrapper from "../general/ArtistWrapper";
import ToolTip from "../general/ToolTip";
import ContextLike from "../trackComponent/ContextLike";
import QueueItemContainer from "./QueueItemContainer";
import { Virtuoso } from "react-virtuoso";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
import QueueLoader from "./QueueLoader";
import { motion } from "motion/react";
function QueueFull() {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as listSongsSection;
  const dataSongId = useSong(
    (state: SongState) => (state.songCu as Record<string, string>).id
  );
  const scrollRef = useRef<HTMLElement>(null);
  const currendIndex = outputCurrentIndex(playListArray.idArray, dataSongId);
  const trimArray = playListArray.idArray.slice(currendIndex);
  const { audioFullRef } = useContext(AudioFullRefContext);

  if (!trimArray?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className=" relative  h-full overflow-hidden flex-1 flex  "
    >
      <QueueLoader queeRef={scrollRef} length={trimArray.length} />
      <div
        className={clsx(
          "overflow-auto relative   no-scrollbar    h-full flex-1 "
        )}
      >
        <Virtuoso
          scrollerRef={(el) => {
            if (el instanceof HTMLElement) {
              scrollRef.current = el;
            }
          }}
          increaseViewportBy={{ top: 240, bottom: 240 }}
          style={{ height: "100%" }}
          className=" will-change-scroll no-scrollbar"
          totalCount={trimArray.length}
          itemContent={(index) => {
            const id = trimArray[index];
            const item = playListArray.songs[id];
            return (
              <div
                key={item.id}
                data-id={item.id}
                className={clsx(
                  "flex z-50 gap-x-2   bg-[#222222]   p-1 group hover:bg-[#333333] items-center justify-center"
                )}
              >
                <div className="w-[50px] relative">
                  <div className="size-[50px] group-hover:brightness-75 relative">
                    {item.cover_url && (
                      <Image src={item.cover_url} fill alt="img" sizes="50px" />
                    )}
                  </div>
                  <ToggleElement
                    playlistSong={playListArray}
                    song={item}
                    className="z-10 hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>

                <div className="flex-1 flex-col overflow-hidden flex justify-center">
                  <ToolTip tooltipContent={item.name}>
                    <div className="truncate">{item.name}</div>
                  </ToolTip>

                  <ArtistWrapper artists={item.artists} />
                </div>

                <div className="w-[30px] flex items-center">
                  <ContextInfoTrack
                    id={undefined}
                    source={undefined}
                    song={item}
                  >
                    <ContextLike id={item.song_id}>
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
            );
          }}
        />
      </div>
    </motion.div>
  );
}

export default QueueFull;
