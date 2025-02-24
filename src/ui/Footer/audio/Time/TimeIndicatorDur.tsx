import { TimeFormat } from "@/lib/TimeFormat";
interface Props extends React.ComponentProps<"span"> {
  duration: number | undefined;
}
function TimeIndicatorDur({ className, duration }: Props) {
  // data: string;
  // dataCur: React.MutableRefObject<HTMLSpanElement | null>;
  // console.log("render timeindicator");
  return <span className={className}>{TimeFormat(duration)}</span>;
}

export default TimeIndicatorDur;
