import { useCallback, useEffect, useRef } from "react";
import { fetchSegement } from "../MediaSource/fetchSegement";
import { getRemainingBufferDuration } from "../MediaSource/getRemainBuffer";
const bufferThreshold = 25;
const mimeType_audio = "audio/mp4";
const codecs_audio = "mp4a.40.2";
const mimeCodec_audio = `${mimeType_audio};codecs="${codecs_audio}"`;
const useMediaSourceBuffer = (url: string, sege: number) => {
  const fetching = useRef<boolean>(false);
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
    return () => {
      clearUpPreviousSong();
    };
  }, [startUp, url, clearUpPreviousSong]);
  return { dataAudio, segNum, loadNextSegment, fetching, abortController };
};
export default useMediaSourceBuffer;
