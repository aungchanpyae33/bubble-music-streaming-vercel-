import { TimeFormat } from "@/lib/TimeFormat";
function TimeIndicatorCur({
  value,
  duration,
}: {
  value: number;
  duration: number;
}) {
  const data = 100 - value;
  const currentTime = (data / 100) * duration;
  return <span className="time ">{TimeFormat(currentTime)}</span>;
}

export default TimeIndicatorCur;
