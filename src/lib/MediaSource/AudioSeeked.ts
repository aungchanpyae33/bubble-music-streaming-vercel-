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
}: AudioSeekedProp) => {
  const data = per * duration;
  const seekSeg = playBackRate({
    dataAudio,
    data,
    sege,
    duration,
    bufferThreshold,
  });
  AbortFetch(fetching, abortController, seekSeg);
  if (seekSeg !== fetching.current.fetchingseg) {
    segNum.current = seekSeg;
    loadNextSegment();
  }
};
export default AudioSeeked;
