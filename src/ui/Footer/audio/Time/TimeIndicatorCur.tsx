import { TimeFormat } from "@/lib/TimeFormat";
interface Props extends React.ComponentProps<"span"> {
  value: number;
  duration: number;
}
function TimeIndicatorCur({ value, duration, className }: Props) {
  const data = 100 - value;
  const currentTime = (data / 100) * duration;
  return <span className={className}>{TimeFormat(currentTime)}</span>;
}

export default TimeIndicatorCur;
