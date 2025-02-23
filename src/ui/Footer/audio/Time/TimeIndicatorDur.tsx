import { TimeFormat } from "@/lib/TimeFormat";
import clsx from "clsx";

function TimeIndicatorDur({
  duration,
  isForAudioFull,
}: {
  duration: number | undefined;
  isForAudioFull: boolean;
}) {
  // data: string;
  // dataCur: React.MutableRefObject<HTMLSpanElement | null>;
  // console.log("render timeindicator");
  return (
    <span
      className={clsx("time sm:inline", {
        hidden: !isForAudioFull,
      })}
    >
      {TimeFormat(duration)}
    </span>
  );
}

export default TimeIndicatorDur;
