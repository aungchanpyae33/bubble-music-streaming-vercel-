import { RefObject } from "react";

function AudioProgressbar({
  value,
  progressRef,
}: {
  value: number;
  progressRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className="bg-white  absolute top-0 left-0 h-full"
      style={{
        right: `${value}%`,
      }}
      ref={progressRef}
    ></div>
  );
}

export default AudioProgressbar;
