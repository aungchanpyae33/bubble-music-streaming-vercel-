"use client";
import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/ToggleElement";
import { FocusElement } from "@/lib/Accessibility/FocusElement";
import ArrowNavi from "@/lib/Accessibility/ArrowNavi";
import { clsx } from "clsx";
import { RefObject } from "react";

function Track({
  name,
  duration,
  url,
  sege,
  index,
}: // roleCell,
// dataInc,
{
  name: string;
  duration: number;
  url: string;
  sege: number;
  index: number;
  // roleCell: RefObject<number>;
  // dataInc: RefObject<number>;
}) {
  return (
    <div
      className={clsx(
        " p-3 border border-black shadow-md  flex justify-between mb-2 focus-within:bg-red-200 [&:has(:focus-visible)]:ring-4"
      )}
      // tabIndex={0}
      id="uni1"
      role={`cell${index + 1}`}
      // onKeyDown={(e) => {
      //   ArrowNavi(e, roleCell, "ArrowRight", "ArrowLeft", 1, "rowCell");
      // }}
      // onFocus={(e) => {
      //   dataInc.current = index + 1;
      //   FocusElement(e.currentTarget, "rowCell", roleCell);
      // }}
    >
      <ToggleElement url={url} sege={sege} duration={duration} name={name} />
      <span>{name}</span>
      <span>{TimeFormat(duration)}</span>
    </div>
  );
}

export default Track;
