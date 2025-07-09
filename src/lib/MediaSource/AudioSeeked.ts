import { RefObject } from "react";
import { playBackRate } from "./playBackRate";
import AbortFetch from "./AbortFetch";
interface AudioSeekedProp {
  per: number;
  duration: number;
  dataAudio: RefObject<HTMLAudioElement | null>;
  segNum: RefObject<number>;
  sege: number | undefined;
  loadNextSegment: () => void;
  bufferThreshold: number;
  abortController: RefObject<AbortController | null>;
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>;
  song_time_stamp: Array<number>;
}
const AudioSeeked = ({
  per,
  duration,
  dataAudio,
  sege,
  segNum,
  loadNextSegment,
  bufferThreshold,
  fetching,
  abortController,
  song_time_stamp,
}: AudioSeekedProp) => {
  const data = per * duration;
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
    // segments are start with 1 , change to 1 if 0
    segNum.current = seekSeg === 0 ? 1 : seekSeg;

    loadNextSegment();
  }
};
export default AudioSeeked;
