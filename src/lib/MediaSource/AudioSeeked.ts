import { RefObject } from "react";
import { playBackRate } from "./playBackRate";
interface AudioSeekedProp {
  per: number;
  duration: number;
  dataAudio: RefObject<HTMLAudioElement | null>;
  segNum: RefObject<number>;
  sege: number | undefined;
  loadNextSegment: () => void;
}
const AudioSeeked = ({
  per,
  duration,
  dataAudio,
  sege,
  segNum,
  loadNextSegment,
}: AudioSeekedProp) => {
  const data = per * duration;
  segNum.current = playBackRate({ dataAudio, data, sege, duration });
  loadNextSegment();
};
export default AudioSeeked;
