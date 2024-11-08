import { TimeFormat } from "@/lib/TimeFormat";
import { RefObject } from "react";
function TimeIndicatorCur({
  dataCur,
}: {
  dataCur: RefObject<HTMLSpanElement | null>;
}) {
  console.log("render timeindicator");
  return (
    <span ref={dataCur} className="time">
      {TimeFormat(0)}
    </span>
  );
}

export default TimeIndicatorCur;
