import { TimeFormat } from "@/lib/TimeFormat";
function TimeIndicatorCur({ timePosition }: { timePosition: number }) {
  return <span className="time ">{TimeFormat(timePosition)}</span>;
}

export default TimeIndicatorCur;
