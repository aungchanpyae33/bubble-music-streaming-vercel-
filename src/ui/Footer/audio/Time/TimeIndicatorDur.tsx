import { TimeFormat } from "@/lib/TimeFormat";

function TimeIndicatorDur({ duration }: { duration: number | undefined }) {
  // data: string;
  // dataCur: React.MutableRefObject<HTMLSpanElement | null>;
  // console.log("render timeindicator");
  return <span className="time">{TimeFormat(duration)}</span>;
}

export default TimeIndicatorDur;
