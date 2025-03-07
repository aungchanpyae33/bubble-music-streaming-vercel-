import { RefObject, useEffect } from "react";
import { playBackRate } from "../MediaSource/playBackRate";

const MediaSessionSeek = (
  fetching: RefObject<boolean>,
  abortController: RefObject<AbortController | null>,
  segNum: RefObject<number>,
  dataAudio: RefObject<HTMLAudioElement | null>,
  sege: number | undefined,
  loadNextSegment: () => void,
  duration: number,
  bufferThreshold: number
) => {
  // Extract the `value` from the event beforehand to avoid issues with `e` in dependencies

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        console.log(details.seekTime);
        const data = +details.seekTime!;
        // Abort fetching if necessary
        if (fetching.current) {
          abortController.current?.abort();
          abortController.current = new AbortController(); // Reset abort controller
          fetching.current = false;
        }
        console.log("media");
        // Use the extracted `data`
        const seekSeg = playBackRate({
          dataAudio,
          data,
          sege,
          duration,
          bufferThreshold,
        });
        if (seekSeg) {
          console.log(seekSeg);
          segNum.current = seekSeg;
          loadNextSegment();
        }
      });
    }
    return () => {
      navigator.mediaSession.setActionHandler("seekto", null);
    };
  }, [
    fetching,
    abortController,
    segNum,
    dataAudio,
    sege,
    loadNextSegment,
    duration,
    bufferThreshold,
    // Ensure `data` is part of dependencies
  ]);
};

export default MediaSessionSeek;
