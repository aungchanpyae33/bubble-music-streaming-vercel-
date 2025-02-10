import { Dispatch, SetStateAction } from "react";

interface AudioSeekingProp {
  newValue: number;
  duration: number;
  setValue: Dispatch<SetStateAction<number>>;
  setTimePosition: Dispatch<SetStateAction<number>>;
}
const AudioSeeking = ({
  newValue,
  duration,
  setValue,
  setTimePosition,
}: AudioSeekingProp) => {
  const data = 100 - newValue;
  const currentTime = (data / 100) * duration;
  setValue(newValue);
  setTimePosition(currentTime);
};
export default AudioSeeking;
