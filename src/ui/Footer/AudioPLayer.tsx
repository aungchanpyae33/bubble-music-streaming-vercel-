"use client";
import React, { useCallback, useEffect, useRef } from "react";
// import { fetchSegement } from "@/lib/MediaSource/fetchSegement";
import { useSong } from "@/lib/zustand";
// import { getRemainingBufferDuration } from "@/lib/MediaSource/getRemainBuffer";
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
function AudioPlayer() {
  console.log("audioPLayer");
  const { sege, name, duration } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;

  const [, url] = useSong(
    (state: SongState) =>
      Object.entries(state.songCu as Record<string, string>)[0] || []
  );

  const { dataAudio, loadNextSegment, segNum, abortController, fetching } =
    useMediaSourceBuffer(url, sege);
  // useMediaSession(name, url);
  console.log(name);
  MediaSessionDes(name, url);
  console.log("render audio playre");
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
        // i need to wrap in div to remove uncessary usage child
        <div className="flex  items-center">
          <AudioDisplayFooter
            urlImage={
              "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
            }
          />

          <AudioInfo name={name} />
          <div className="audioFunctionContainer flex flex-col items-center w-[80%] md:w-[50%]">
            <div className="upContainer">
              <AudioFunctionButton functionality="pre" url={url} />
              <ToggleButton />
              <AudioFunctionButton functionality="nex" url={url} />
            </div>
            <div className="BottomContainer w-[90%]">
              <AudioElement
                Child={<TimeIndicatorDur duration={duration} />}
              ></AudioElement>
            </div>
          </div>
        </div>
      }
    </DataContext.Provider>
  );
}

export default AudioPlayer;
