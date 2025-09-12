import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { fetchSegment } from "../MediaSource/fetchSegment";
import { getRemainingBufferDuration } from "../MediaSource/getRemainBuffer";
import { useRepeatAndCurrentPlayList } from "../zustand";
import throttle from "../throttle";
import { fetchInitSegment } from "../MediaSource/fetchInitSegment";
const bufferThreshold = 10;
const mimeType_audio = "audio/mp4";
const codecs_audio = "mp4a.40.2";
const mimeCodec_audio = `${mimeType_audio};codecs="${codecs_audio}"`;
export interface FetchingState {
  isFetch: boolean;
  fetchingseg: number;
}
const useMediaSourceBuffer = (
  url: string,
  sege: number,
  song_time_stamp: Array<number>,
  id: string,
  dataAudio: React.RefObject<HTMLAudioElement | null>
) => {
  const fetching = useRef<FetchingState>({
    isFetch: false,
    fetchingseg: 1,
  });
  // to track fetching promise in prefetchSegment to avoid fetchagain nor abort
  const prefetchPromiseRef = useRef<Promise<ArrayBuffer[]> | null>(null);
  const segNum = useRef(1);
  const mediaSource = useRef<MediaSource | null>(null);
  const sourceBuffer = useRef<SourceBuffer | null>(null);
  const prefetchedUrl = useRef("");
  const abortController = useRef<AbortController | null>(null);
  const initAbortController = useRef<AbortController | null>(null);
  const isCalled = useRef(false);
  const isCalledPrefetch = useRef(false);
  const prefetchSegment = useRepeatAndCurrentPlayList(
    (state) => state.prefetchSegment
  );

  // function to wait data from prefetchSegment
  const checkFeching = useCallback(async () => {
    return prefetchSegment({
      id,
      abortController,
      prefetchedUrl,
      prefetchPromiseRef,
    });
  }, [prefetchSegment, id]);

  const fetchAudioSegment = useCallback(
    async (Num: number) => {
      if (abortController.current === null) {
        console.log("abort");
        // return when no initialized
        return;
      }
      // url === prefetchedUrl.current if true mean , there is alaredy fetch call for prefetchSegment and if has use it , or if it does not have , wait it
      //  restricted to init segment
      if (
        url === prefetchedUrl.current &&
        Num === 1 &&
        prefetchPromiseRef.current
      ) {
        if (
          sourceBuffer.current?.buffered &&
          !sourceBuffer.current.updating &&
          mediaSource.current?.readyState
        ) {
          const data = await checkFeching();

          sourceBuffer.current!.appendBuffer(data![1]);
          // reset prmoise
          prefetchPromiseRef.current = null;

          fetching.current.isFetch = false;
          segNum.current++;
        }
      } else {
        await fetchSegment(
          url,
          sourceBuffer,
          mediaSource,
          Num,
          abortController,
          segNum,
          fetching
        );
      }
    },
    [url, checkFeching]
  );

  const loadNextSegment = useCallback(async () => {
    const { remainingBuffer, segData } = getRemainingBufferDuration(
      dataAudio,
      song_time_stamp
    );

    // condition 1 : if current segment is greater than total segment and mediaSource is open and isCalled is true
    if (
      segNum.current > sege &&
      mediaSource.current?.readyState === "open" &&
      isCalled.current
    ) {
      mediaSource!.current!.endOfStream();
      isCalled.current = false;
    }

    // condition 2 : if current segment is greater than total segment and isCalledPrefetch is true and prefetchPromiseRef is null
    if (
      segNum.current > sege &&
      isCalledPrefetch.current &&
      !prefetchPromiseRef.current
    ) {
      checkFeching();
      isCalledPrefetch.current = false;
    }
    // condition 3 : if current segment is less than total segment and isCalled is false and sourceBuffer is not updating and sourceBuffer is buffered for reset buffer if it backs to the  less part of  24 segment
    if (
      segNum.current < sege &&
      !isCalled.current &&
      sourceBuffer.current?.buffered &&
      !sourceBuffer.current.updating
    ) {
      isCalled.current = true;
      isCalledPrefetch.current = true;
    }
    // note : need to ues <= as it need to fetch 24 segment
    if (
      !fetching.current.isFetch &&
      bufferThreshold > remainingBuffer &&
      segNum.current <= sege
    ) {
      fetching.current.isFetch = true;
      fetching.current.fetchingseg = segNum.current;
      await fetchAudioSegment(segNum.current);
    } else if (bufferThreshold < remainingBuffer) {
      // console.log("hit me", segData);
      segNum.current = segData;
    }
  }, [fetchAudioSegment, sege, checkFeching, song_time_stamp, dataAudio]);

  const throttleLoadNextSegment = useMemo(
    () => throttle(loadNextSegment, 1000),
    [loadNextSegment]
  );
  const updateendLoadNextSegment = useCallback(() => {
    if (segNum.current <= sege) {
      loadNextSegment();
    }
    // because of using throttle , i need to immediate endstream if lastsegement is append before 0.3 second of the song by seek

    if (segNum.current > sege && mediaSource.current?.readyState === "open") {
      mediaSource!.current!.endOfStream();
      isCalled.current = false;
    }
  }, [loadNextSegment, sege]);

  const sourceOpen = useCallback(async () => {
    if (sourceBuffer.current === null) {
      sourceBuffer.current =
        mediaSource.current!.addSourceBuffer(mimeCodec_audio);
      // url === prefetchedUrl.current if true mean , there is alaredy fetch call for prefetchSegment and if has use it , or if it does not have , wait it
      if (url === prefetchedUrl.current && prefetchPromiseRef.current) {
        if (
          sourceBuffer.current?.buffered &&
          !sourceBuffer.current.updating &&
          mediaSource.current?.readyState
        ) {
          const data = await checkFeching();
          sourceBuffer.current!.appendBuffer(data![0]);
        }
      } else {
        await fetchInitSegment(
          url,
          sourceBuffer,
          mediaSource,
          fetching,
          segNum,
          abortController,
          initAbortController
        );
      }

      if (sourceBuffer.current) {
        sourceBuffer.current!.addEventListener(
          "updateend",
          updateendLoadNextSegment
        );
      }
      dataAudio.current!.addEventListener(
        "timeupdate",
        throttleLoadNextSegment
      );
    }
  }, [
    url,
    updateendLoadNextSegment,
    throttleLoadNextSegment,
    checkFeching,
    dataAudio,
  ]);

  const clearUpPreviousSong = useCallback(() => {
    const audio = dataAudio.current;
    if (audio) {
      audio!.pause();
      audio!.src = "";
      audio!.removeEventListener("timeupdate", throttleLoadNextSegment);
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
    if (initAbortController.current) {
      initAbortController.current.abort();
      initAbortController.current = null;
    }
    segNum.current = 1;
  }, [throttleLoadNextSegment, sourceOpen, updateendLoadNextSegment]);
  const startUp = useCallback(() => {
    dataAudio.current!.src = URL.createObjectURL(mediaSource.current!);

    mediaSource.current!.addEventListener("sourceopen", sourceOpen, false);
  }, [sourceOpen]);

  useEffect(() => {
    if (!url) {
      return;
    }
    //  if there is a prefetchFetching and the currentSong is not for this , set back to null
    if (url !== prefetchedUrl.current) {
      prefetchPromiseRef.current = null;
    }
    if (typeof window !== "undefined") {
      const MediaSource = window.MediaSource || null;
      mediaSource.current = new MediaSource();
      startUp();
    }
    abortController.current = new AbortController();
    initAbortController.current = new AbortController();
    return () => {
      clearUpPreviousSong();
    };
  }, [startUp, url, clearUpPreviousSong, id, dataAudio]);
  return {
    segNum,
    loadNextSegment,
    fetching,
    abortController,
    bufferThreshold,
  };
};
export default useMediaSourceBuffer;
