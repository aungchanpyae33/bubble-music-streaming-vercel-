"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { fetchSegement } from "@/lib/MediaSource/fetchSegement";
import { Song } from "@/lib/zustand";
import { getRemainingBufferDuration } from "@/lib/MediaSource/getRemainBuffer";
import AudioElement from "./audio/AudioElement";
import DataContext from "@/lib/MediaSource/ContextMedia";
import ToggleButton from "./audio/ToggleButton";
import TimeIndicatorDur from "./audio/TimeIndicatorDur";
import AudioFunctionButton from "./audio/AudioFunctionButton";
import AudioDisplayFooter from "./AudioDisplayFooter";

const mimeType_audio = "audio/mp4";
const codecs_audio = "mp4a.40.2";
const mimeCodec_audio = `${mimeType_audio};codecs="${codecs_audio}"`;

const bufferThreshold = 25;

function AudioPlayer() {
  const fetching = useRef<boolean>(false);
  const { duration, sege, name } = Song((state: any) => state.songCu);

  const [, url] = Song(
    (state: any) =>
      Object.entries(state.songCu as Record<string, string>)[0] || []
  );

  const segNum = useRef(1);
  const dataAudio = useRef<HTMLAudioElement | null>(null);

  const mediaSource = useRef<MediaSource | null>(null);
  const sourceBuffer = useRef<SourceBuffer | null>(null);
  const abortController = useRef<AbortController | null>(null);

  const fetchAudioSegment = useCallback(
    (segNum: number) => {
      if (abortController.current === null) {
        // return when no initialized
        return;
      }

      fetchSegement(url, sourceBuffer, segNum, abortController.current);
    },
    [url]
  );
  const loadNextSegment = useCallback(() => {
    const remainingBuffer = getRemainingBufferDuration(dataAudio);

    if (
      !fetching.current &&
      bufferThreshold > remainingBuffer &&
      segNum.current <= sege
    ) {
      fetching.current = true;

      fetchAudioSegment(segNum.current);
      segNum.current++;
    }
  }, [fetchAudioSegment, sege]);

  const sourceOpen = useCallback(() => {
    if (sourceBuffer.current === null) {
      sourceBuffer.current =
        mediaSource.current!.addSourceBuffer(mimeCodec_audio);
      fetchSegement(url, sourceBuffer, undefined, abortController.current);
      sourceBuffer.current!.addEventListener("updateend", () => {
        fetching.current = false;
        loadNextSegment();
      });
      dataAudio.current!.addEventListener("timeupdate", loadNextSegment);
    }
  }, [loadNextSegment, url]);

  const clearUpPreviousSong = useCallback(() => {
    const audio = dataAudio.current;
    if (audio) {
      audio!.pause();
      audio!.src = "";
      audio!.removeEventListener("timeupdate", loadNextSegment);
    }
    if (sourceBuffer.current) {
      sourceBuffer.current.removeEventListener("updateend", loadNextSegment);
      sourceBuffer.current = null;
    }
    if (mediaSource.current) {
      mediaSource.current!.removeEventListener("sourceopen", sourceOpen);
      mediaSource.current = null;
    }
    if (abortController.current) {
      // it will abort when it use with signal
      abortController.current.abort();
      abortController.current = null;
    }
    segNum.current = 1;
  }, [loadNextSegment, sourceOpen]);

  const startUp = useCallback(() => {
    dataAudio.current!.src = URL.createObjectURL(mediaSource.current!);
    mediaSource.current!.addEventListener("sourceopen", sourceOpen, false);
  }, [sourceOpen]);

  useEffect(() => {
    if (!url) {
      return;
    }
    if (typeof window !== "undefined") {
      const MediaSource = window.MediaSource || null;
      mediaSource.current = new MediaSource();
      startUp();
    }

    abortController.current = new AbortController();

    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Alright",
        artist: "Kendrick Lamar",
        album: "To Pimp A Butterfly",
        artwork: [
          {
            src: "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg",
            sizes: "300x300",
            type: "image/jpg",
          },
        ],
      });
    }
    return () => {
      clearUpPreviousSong();
    };
  }, [startUp, url, clearUpPreviousSong]);

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
