import { useCallback, useEffect, useRef } from "react";
import { fetchSegment } from "../MediaSource/fetchSegment";
import { getRemainingBufferDuration } from "../MediaSource/getRemainBuffer";
import { useRepeat } from "../zustand";
const bufferThreshold = 10;
const mimeType_audio = "audio/mp4";
const codecs_audio = "mp4a.40.2";
const mimeCodec_audio = `${mimeType_audio};codecs="${codecs_audio}"`;
export interface FetchingState {
  isFetch: boolean;
  fetchingseg: number;
}
const useMediaSourceBuffer = (url: string, sege: number) => {
  const fetching = useRef<FetchingState>({
    isFetch: false,
    fetchingseg: 1,
  });
  const segNum = useRef(1);
  const dataAudio = useRef<HTMLAudioElement | null>(null);
  const mediaSource = useRef<MediaSource | null>(null);
  const sourceBuffer = useRef<SourceBuffer | null>(null);
  const audioInitBufferRef = useRef<ArrayBuffer | null>(null);
  const audioSeg1BufferRef = useRef<ArrayBuffer | null>(null);
  const abortController = useRef<AbortController | null>(null);
  const prefetchSegment = useRepeat((state) => state.prefetchSegment);
  const fetchAudioSegment = useCallback(
    (segNum: number) => {
      if (abortController.current === null) {
        console.log("abort");
        // return when no initialized
        return;
      }
      if (audioSeg1BufferRef.current) {
        if (
          sourceBuffer.current?.buffered &&
          !sourceBuffer.current.updating &&
          mediaSource.current?.readyState
        ) {
          // console.log(segNum, "it got buffend");
          sourceBuffer.current!.appendBuffer(audioSeg1BufferRef.current);
          audioSeg1BufferRef.current = null;
        }
      } else {
        fetchSegment(url, sourceBuffer, mediaSource, segNum, abortController);
      }
    },
    [url]
  );

  const loadNextSegment = useCallback(() => {
    const { remainingBuffer, segData } = getRemainingBufferDuration(dataAudio);
    // without endofStream , audio ended can not be trigger
    if (segNum.current > sege && mediaSource.current?.readyState === "open") {
      mediaSource!.current!.endOfStream();
    }
    if (
      !fetching.current.isFetch &&
      bufferThreshold > remainingBuffer &&
      segNum.current <= sege
    ) {
      fetching.current.isFetch = true;
      fetching.current.fetchingseg = segNum.current;
      fetchAudioSegment(segNum.current);
      segNum.current++;
      // console.log(segNum.current);
    } else {
      segNum.current = segData;
    }
  }, [fetchAudioSegment, sege]);

  const updateendLoadNextSegment = useCallback(() => {
    fetching.current.isFetch = false;
    // without endofStream , audio ended can not be trigger
    console.log("i got nothing call");
    if (segNum.current < sege) {
      loadNextSegment();
    } else {
      prefetchSegment({
        url: "https://njjvikpbvsfomrpyxnta.supabase.co/storage/v1/object/public/sdk/music/init.mp4",
        sourceBuffer,
        mediaSource,
        segNum: undefined, // start point
        abortController,
        audioInitBufferRef,
        audioSeg1BufferRef,
      });
    }
  }, [loadNextSegment, sege, prefetchSegment]);

  const sourceOpen = useCallback(() => {
    if (sourceBuffer.current === null) {
      sourceBuffer.current =
        mediaSource.current!.addSourceBuffer(mimeCodec_audio);
      if (audioInitBufferRef.current) {
        if (
          sourceBuffer.current?.buffered &&
          !sourceBuffer.current.updating &&
          mediaSource.current?.readyState
        ) {
          // console.log(segNum, "it got buffend");
          sourceBuffer.current!.appendBuffer(audioInitBufferRef.current);
          audioInitBufferRef.current = null;
        }
      } else {
        fetchSegment(
          url,
          sourceBuffer,
          mediaSource,
          undefined, // start point
          abortController
        );
      }

      sourceBuffer.current!.addEventListener(
        "updateend",
        updateendLoadNextSegment
      );
      dataAudio.current!.addEventListener("timeupdate", loadNextSegment);
    }
  }, [loadNextSegment, url, dab, updateendLoadNextSegment]);

  const clearUpPreviousSong = useCallback(() => {
    const audio = dataAudio.current;
    if (audio) {
      audio!.pause();
      audio!.src = "";
      audio!.removeEventListener("timeupdate", loadNextSegment);
    }
    if (sourceBuffer.current) {
      sourceBuffer.current.removeEventListener(
        "updateend",
        updateendLoadNextSegment
      );
      sourceBuffer.current = null;
    }
    if (mediaSource.current) {
      if (mediaSource.current.readyState === "open") {
        try {
          mediaSource.current.endOfStream();
        } catch (error) {
          console.error("Error ending media stream:", error);
        }
      }
      mediaSource.current!.removeEventListener("sourceopen", sourceOpen);
      mediaSource.current = null;
    }
    if (abortController.current) {
      // it will abort when it use with signal
      abortController.current.abort();
      abortController.current = null;
    }
    segNum.current = 1;
  }, [loadNextSegment, sourceOpen, updateendLoadNextSegment]);

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
    return () => {
      clearUpPreviousSong();
    };
  }, [startUp, url, clearUpPreviousSong]);
  return {
    dataAudio,
    segNum,
    loadNextSegment,
    fetching,
    abortController,
    bufferThreshold,
  };
};
export default useMediaSourceBuffer;
