"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useSong } from "@/lib/zustand";
import AudioElement from "./audio/AudioElement";
import DataContext from "@/lib/MediaSource/ContextMedia";
import ToggleButton from "./audio/ToggleButton";
import TimeIndicatorDur from "./audio/TimeIndicatorDur";
import AudioFunctionButton from "./audio/AudioFunctionButton";
import AudioDisplayFooter from "./AudioDisplayFooter";
import useMediaSourceBuffer from "@/lib/CustomHooks/MediaSourceBuffer";
import MediaSessionDes from "@/lib/MediaSession/MediaSessionDescription";
import AudioInfo from "./AudioInfo";
import type { SongDetail, SongState } from "@/lib/zustand";
import AudioFunctionPre from "./audio/AudioFunctionPre";
import AudioFunctionNext from "./audio/AudioFunctionNext";
import AudioFunctionRepeat from "./audio/AudioFunctionRepeat";
import AudioFunctionShuffle from "./audio/AudioFunctionShuffle";
import Volume from "./volume/Volume";
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
  MediaSessionDes(name, url);
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
        <div className="flex w-full h-full">
          <div className="w-[20%] md:w-[25%] lg:w-[28%] flex bg-yellow-700">
            <AudioDisplayFooter
              urlImage={
                "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
              }
            />
            {/* without it will just changing data for audioinfo */}
            {name && <AudioInfo name={name} key={name} />}
          </div>

          <div className="flex-1  flex bg-blue-100">
            <div className="audioFunctionContainer flex  flex-col flex-1 items-center">
              <div className="upContainer flex gap-2">
                <AudioFunctionButton>
                  {/* in jsx when use arrow and {} , react expect to return elemetn , if it does not have  return ,  implicitly returns void, or undefined, so, react think nothing to render  */}
                  {(playListArray) => (
                    // return element
                    <>
                      <AudioFunctionShuffle urlProp={playListArray} url={url} />
                      <AudioFunctionPre url={url} urlProp={playListArray} />
                      <ToggleButton urlProp={playListArray} />
                      <AudioFunctionNext url={url} urlProp={playListArray} />
                      <AudioFunctionRepeat />
                    </>
                  )}
                </AudioFunctionButton>
              </div>
              <div className="BottomContainer w-full ">
                <AudioElement
                  url={url}
                  Child={<TimeIndicatorDur duration={duration} />}
                ></AudioElement>
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
