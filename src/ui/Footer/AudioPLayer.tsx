"use client";
import React, { useRef } from "react";
import { useSong } from "@/lib/zustand";
import AudioElement from "./audio/AudioElement";
import DataContext from "@/lib/MediaSource/ContextMedia";
import ToggleButton from "./audio/Toggle/ToggleButton";
import TimeIndicatorDur from "./audio/Time/TimeIndicatorDur";
import AudioDisplayFooter from "./AudioDisplayFooter";
import useMediaSourceBuffer from "@/lib/CustomHooks/MediaSourceBuffer";
import AudioInfo from "./AudioInfo";
import type { SongDetail, SongState } from "@/lib/zustand";
import AudioFunctionRepeat from "./audio/AudioFunction/AudioFunctionRepeat";
import AudioFunctionShuffle from "./audio/AudioFunction/AudioFunctionShuffle";
import Volume from "./volume/Volume";
import MediaSessionButtonWrapper from "./audio/MediaSessionWrapper/MediaSessionButtonWrapper";
import AudioFunctionButton from "./audio/AudioFunction/AudioFunctionButton";
import AudioFunctionPre from "./audio/AudioFunction/AudioFunctionPre";
import AudioFunctionNext from "./audio/AudioFunction/AudioFunctionNext";
import MediaSessionSeekWrapper from "./audio/MediaSessionWrapper/MediaSessionSeekWrapper";
import AudioFull from "./audioFull/AudioFull";
import FullToggleButton from "./audioFull/FullToggleButton";
import VolumeWrapper from "./volume/VolumeWrapper";
import QueueButton from "./audio/QueueButton";
import AudioFooterContainer from "./AudioFooterContainer";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
function AudioPlayer({
  footerRef,
}: {
  footerRef: React.RefObject<HTMLElement | null>;
}) {
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const { sege, name, duration } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;

  const url = useSong(
    (state: SongState) =>
      Object.values(state.songCu as Record<string, string>)[0]
  );
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    abortController,
    fetching,
    bufferThreshold,
  } = useMediaSourceBuffer(url, sege);

  // console.log("hf", url);
  return (
    <DataContext.Provider
      value={{
        dataAudio,
        loadNextSegment,
        segNum,
        sege,
        duration,
        abortController,
        fetching,
        bufferThreshold,
      }}
    >
      <AudioFooterContainer footerRef={footerRef} url={url}>
        <AudioFull
          footerRef={footerRef}
          url={url}
          duration={duration}
          toggleRef={toggleRef}
        />
        <div className=" w-full sm:w-[25%]   md:w-[25%] max-w-[375px]  flex items-center">
          <AudioDisplayFooter
            urlImage={
              "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
            }
          />
          {/* without it will just changing data for audioinfo */}
          {name && (
            <div
              className="flex flex-col overflow-hidden will-change-transform"
              key={name}
            >
              <AudioInfo name={name} isLink={false} />
              <AudioInfo name={"aspea"} isLink={true} />
            </div>
          )}
        </div>

        <div className="max-w-[600px] sm:flex-1 w-fit  flex    ">
          <div className="audioFunctionContainer flex  flex-col flex-1 items-end sm:items-center pr-2 sm:pr-0  justify-center">
            <div className="upContainer ">
              <MediaSessionButtonWrapper url={url}>
                <AudioFunctionButton>
                  {/* in jsx when use arrow and {} , react expect to return elemetn , if it does not have  return ,  implicitly returns void, or undefined, so, react think nothing to render  */}
                  {(playListArray) => (
                    // return element
                    <div
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <AudioFunctionShuffle
                        className="text-white/70 hover:text-white hover:bg-white/10 p-1  sm:inline-block text-sm md:text-base hidden"
                        urlProp={playListArray}
                        url={url}
                      />
                      <AudioFunctionPre
                        className="text-white/70 hover:text-white hover:bg-white/10 p-1  sm:inline-block text-sm md:text-base hidden"
                        url={url}
                        urlProp={playListArray}
                      />
                      <ToggleButton
                        className="p-1 bg-[#CCCCCC] hover:bg-[#DDDDDD] text-black font-medium"
                        urlProp={playListArray}
                      />
                      <AudioFunctionNext
                        url={url}
                        urlProp={playListArray}
                        className="text-white/70 hover:text-white hover:bg-white/10 p-1 text-sm md:text-base"
                      />
                      <AudioFunctionRepeat className="text-white/70 hover:text-white hover:bg-white/10 p-1  sm:inline-block text-sm md:text-base hidden" />
                    </div>
                  )}
                </AudioFunctionButton>
              </MediaSessionButtonWrapper>
            </div>
            <div className="BottomContainer  w-full absolute sm:static top-0 left-0 ">
              <MediaSessionSeekWrapper duration={duration}>
                <AudioElement
                  url={url}
                  Child={
                    <TimeIndicatorDur
                      duration={duration}
                      className="text-sm md:text-base w-[5rem] text-center hidden sm:inline"
                    />
                  }
                ></AudioElement>
              </MediaSessionSeekWrapper>
            </div>
          </div>
        </div>
        <div
          className="w-[20%] md:w-[25%] hidden max-w-[375px] sm:flex  items-center"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="w-full sm:flex  gap-3 relative  items-center justify-around">
            <QueueButton />
            <VolumeWrapper>
              <Volume />
            </VolumeWrapper>
            <FullToggleButton footerRef={footerRef} ref={toggleRef} />
          </div>
        </div>
      </AudioFooterContainer>
    </DataContext.Provider>
  );
}

export default AudioPlayer;
