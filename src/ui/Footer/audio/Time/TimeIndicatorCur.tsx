import { TimeFormat } from "@/lib/TimeFormat";
import clsx from "clsx";
function TimeIndicatorCur({
  value,
  duration,
  isForAudioFull,
}: {
  value: number;
  duration: number;
  isForAudioFull: boolean;
}) {
  const data = 100 - value;
  const currentTime = (data / 100) * duration;
  return (
    <span
      className={clsx("time sm:inline", {
        hidden: !isForAudioFull,
      })}
    >
      {TimeFormat(currentTime)}
    </span>
  );
}

export default TimeIndicatorCur;
