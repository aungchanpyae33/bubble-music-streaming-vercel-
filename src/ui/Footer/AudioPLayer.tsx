"use client";
import React, { useCallback, useEffect, useRef } from "react";
// import { fetchSegement } from "@/lib/MediaSource/fetchSegement";
import { Song } from "@/lib/zustand";
// import { getRemainingBufferDuration } from "@/lib/MediaSource/getRemainBuffer";
import AudioElement from "./audio/AudioElement";
import DataContext from "@/lib/MediaSource/ContextMedia";
import ToggleButton from "./audio/ToggleButton";
import TimeIndicatorDur from "./audio/TimeIndicatorDur";
import AudioFunctionButton from "./audio/AudioFunctionButton";
import AudioDisplayFooter from "./AudioDisplayFooter";
import useMediaSourceBuffer from "@/lib/CustomHooks/MediaSourceBuffer";
import useMediaSession from "@/lib/CustomHooks/MediaSession";

function AudioPlayer() {
  const { duration, sege, name } = Song((state: any) => state.songCu);

  const [, url] = Song(
    (state: any) =>
      Object.entries(state.songCu as Record<string, string>)[0] || []
  );

  const { dataAudio, loadNextSegment, segNum, abortController, fetching } =
    useMediaSourceBuffer(url, sege);
  useMediaSession(name);
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
        <div className="flex justify-between items-center">
          <AudioDisplayFooter
            urlImage={
              "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
            }
          />
          <div>{name}</div>
          <ToggleButton />
          <AudioFunctionButton functionality="pre" url={url} />
          <AudioFunctionButton functionality="nex" url={url} />
          <AudioElement
            Child={<TimeIndicatorDur duration={duration} />}
          ></AudioElement>
        </div>
      }
    </DataContext.Provider>
  );
}

export default AudioPlayer;
