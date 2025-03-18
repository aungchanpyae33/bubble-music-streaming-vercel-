import { useCallback, useEffect, useMemo, useRef } from "react";
import { fetchSegment } from "../MediaSource/fetchSegment";
import { getRemainingBufferDuration } from "../MediaSource/getRemainBuffer";
import { useRepeatAndCurrentPlayList } from "../zustand";
import throttle from "../throttle";
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
  // to track fetching promise in prefetchSegment to avoid fetchagain nor abort
  const prefetchPromiseRef = useRef<Promise<ArrayBuffer[]> | null>(null);
  const segNum = useRef(1);
  const dataAudio = useRef<HTMLAudioElement | null>(null);
  const mediaSource = useRef<MediaSource | null>(null);
  const sourceBuffer = useRef<SourceBuffer | null>(null);
  const prefetchedUrl = useRef("");
  const abortController = useRef<AbortController | null>(null);
  const isCalled = useRef(false);
  const prefetchSegment = useRepeatAndCurrentPlayList(
    (state) => state.prefetchSegment
  );

  // function to wait data from prefetchSegment
  const checkFeching = useCallback(async () => {
    return prefetchSegment({
      currentUrl: url,
      abortController,
      prefetchedUrl,
      prefetchPromiseRef,
    });
  }, [prefetchSegment, url]);

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
          segNum.current++;
        }
      } else {
        await fetchSegment(
          url,
          sourceBuffer,
          mediaSource,
          Num,
          abortController,
          segNum
        );
      }
    },
    [url, checkFeching]
  );

  const loadNextSegment = useCallback(async () => {
    const { remainingBuffer, segData } = getRemainingBufferDuration(dataAudio);
    console.log(
      segNum.current
      // segNum.current >= sege,
      // mediaSource.current?.readyState === "open",
      // isCalled.current
    );
    // without endofStream , audio ended can not be trigger
    if (
      segNum.current > sege &&
      mediaSource.current?.readyState === "open" &&
      isCalled.current
    ) {
      console.log("called");
      mediaSource!.current!.endOfStream();
      isCalled.current = false;
    }
    if (
      segNum.current < sege &&
      !isCalled.current &&
      sourceBuffer.current?.buffered &&
      !sourceBuffer.current.updating
    ) {
      isCalled.current = true;
    }
    if (
      !fetching.current.isFetch &&
      bufferThreshold > remainingBuffer &&
      segNum.current <= sege
    ) {
      fetching.current.isFetch = true;
      fetching.current.fetchingseg = segNum.current;
      fetchAudioSegment(segNum.current);
    } else if (bufferThreshold < remainingBuffer) {
      segNum.current = segData;
    }
  }, [fetchAudioSegment, sege]);

  const throttleLoadNextSegment = useMemo(
    () => throttle(loadNextSegment, 1000),
    [loadNextSegment]
  );
  const updateendLoadNextSegment = useCallback(() => {
    fetching.current.isFetch = false;
    // without endofStream , audio ended can not be trigger

    if (segNum.current < sege) {
      loadNextSegment();
    } else {
      checkFeching(); //
    }
  }, [loadNextSegment, sege, checkFeching]);

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
        fetchSegment(
          url,
          sourceBuffer,
          mediaSource,
          undefined, // start point
          abortController,
          segNum
        );
      }

      sourceBuffer.current!.addEventListener(
        "updateend",
        updateendLoadNextSegment
      );
      dataAudio.current!.addEventListener(
        "timeupdate",
        throttleLoadNextSegment
      );
    }
  }, [url, updateendLoadNextSegment, throttleLoadNextSegment, checkFeching]);

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
