import React, { RefObject, useEffect } from "react";
import { playBackRate } from "../MediaSource/playBackRate";

const MediaSessionSeek = (
  fetching: React.MutableRefObject<boolean>,
  abortController: React.MutableRefObject<AbortController | null>,
  segNum: React.MutableRefObject<number>,
  dataAudio: React.MutableRefObject<HTMLAudioElement | null>,
  sege: number | undefined,
  loadNextSegment: () => void
) => {
  // Extract the `value` from the event beforehand to avoid issues with `e` in dependencies

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        console.log(details.seekTime);
        const data = details.seekTime + "";
        // Abort fetching if necessary
        if (fetching.current) {
          abortController.current?.abort();
          abortController.current = new AbortController(); // Reset abort controller
          fetching.current = false;
        }
        console.log("media");
        // Use the extracted `data`
        segNum.current = playBackRate({ dataAudio, data, sege });
        // Load the next segment
        loadNextSegment();
      });
    }
  }, [
    fetching,
    abortController,
    segNum,
    dataAudio,
    sege,
    loadNextSegment,
    // Ensure `data` is part of dependencies
  ]);
};

export default MediaSessionSeek;
