import { RefObject, useEffect } from "react";
import { playBackRate } from "../MediaSource/playBackRate";
import AbortFetch from "../MediaSource/AbortFetch";

const MediaSessionSeek = (
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>,
  abortController: RefObject<AbortController | null>,
  segNum: RefObject<number>,
  dataAudio: RefObject<HTMLAudioElement | null>,
  sege: number | undefined,
  loadNextSegment: () => void,
  duration: number,
  bufferThreshold: number,
  song_time_stamp: Array<number>
) => {
  // Extract the `value` from the event beforehand to avoid issues with `e` in dependencies

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        console.log(details.seekTime);
        const data = +details.seekTime!;
        // Abort fetching if necessary

        // Use the extracted `data`
        const seekSeg = playBackRate({
          dataAudio,
          data,
          sege,
          duration,
          bufferThreshold,
          song_time_stamp,
        });
        AbortFetch(fetching, abortController, seekSeg);
        if (seekSeg !== fetching.current.fetchingseg) {
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
    song_time_stamp,
  ]);
};

export default MediaSessionSeek;
