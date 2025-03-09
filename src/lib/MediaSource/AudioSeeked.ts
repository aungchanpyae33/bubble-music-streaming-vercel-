import { RefObject } from "react";
import { playBackRate } from "./playBackRate";
interface AudioSeekedProp {
  per: number;
  duration: number;
  dataAudio: RefObject<HTMLAudioElement | null>;
  segNum: RefObject<number>;
  sege: number | undefined;
  loadNextSegment: () => void;
  bufferThreshold: number;
}
const AudioSeeked = ({
  per,
  duration,
  dataAudio,
  sege,
  segNum,
  loadNextSegment,
  bufferThreshold,
}: AudioSeekedProp) => {
  const data = per * duration;
  const seekSeg = playBackRate({
    dataAudio,
    data,
    sege,
    duration,
    bufferThreshold,
  });
  segNum.current = seekSeg;
  loadNextSegment();
};
export default AudioSeeked;
