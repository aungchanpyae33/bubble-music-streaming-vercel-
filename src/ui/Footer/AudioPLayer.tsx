"use client";
import React from "react";
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
function AudioPlayer() {
  const { sege, name, duration } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;

  const [, url] = useSong(
    (state: SongState) =>
      Object.entries(state.songCu as Record<string, string>)[0] || []
  );

  const { dataAudio, loadNextSegment, segNum, abortController, fetching } =
    useMediaSourceBuffer(url, sege);

  console.log("hf", url);
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
      }}
    >
      {
        <div className="flex gap-4  sm:gap-0 relative w-full h-full">
          <div className=" w-full sm:w-[25%]  md:w-[25%] lg:w-[28%] flex items-center bg-yellow-700">
            <AudioDisplayFooter
              urlImage={
                "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
              }
            />
            {/* without it will just changing data for audioinfo */}
            {name && <AudioInfo name={name} key={name} />}
          </div>

          <div className="flex-1  flex  ">
            <div className="audioFunctionContainer flex  flex-col flex-1 items-end sm:items-center pr-2 justify-center">
              <div className="upContainer flex gap-2">
                <MediaSessionButtonWrapper url={url}>
                  <AudioFunctionButton>
                    {/* in jsx when use arrow and {} , react expect to return elemetn , if it does not have  return ,  implicitly returns void, or undefined, so, react think nothing to render  */}
                    {(playListArray) => (
                      // return element
                      <>
                        <AudioFunctionShuffle
                          urlProp={playListArray}
                          url={url}
                        />
                        <AudioFunctionPre url={url} urlProp={playListArray} />
                        <ToggleButton urlProp={playListArray} />
                        <AudioFunctionNext url={url} urlProp={playListArray} />
                        <AudioFunctionRepeat />
                      </>
                    )}
                  </AudioFunctionButton>
                </MediaSessionButtonWrapper>
              </div>
              <div className="BottomContainer w-full absolute sm:static top-0 left-0 ">
                <MediaSessionSeekWrapper duration={duration}>
                  <AudioElement
                    url={url}
                    Child={<TimeIndicatorDur duration={duration} />}
                  ></AudioElement>
                </MediaSessionSeekWrapper>
              </div>
            </div>
          </div>

          <div className="w-[20%] md:w-[25%] hidden  lg:w-[30%] sm:flex bg-yellow-700 gap-1  items-center">
            <button className="bg-black text-white p-1">lyr</button>
            <button className="bg-black text-white p-1">que</button>
            <Volume />
          </div>
        </div>
      }
    </DataContext.Provider>
  );
}

export default AudioPlayer;
