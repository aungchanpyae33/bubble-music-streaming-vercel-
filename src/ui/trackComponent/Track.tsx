"use client";
import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/ToggleElement";
import { FocusElement } from "@/lib/Assibility/FocusElement";
import ArrowNavi from "@/lib/Assibility/ArrowNavi";
import clsx from "clsx";

function Track({
  name,
  duration,
  url,
  sege,
  index,
  roleCell,
  dataInc,
}: {
  name: string;
  duration: number;
  url: string;
  sege: number;
  index: number;
  roleCell: React.MutableRefObject<number>;
  dataInc: React.MutableRefObject<number>;
}) {
  return (
    <div
      className={clsx(
        " p-3 border border-black shadow-md  flex justify-between mb-2 focus-within:bg-red-200 [&:has(:focus-visible)]:ring-4"
      )}
      tabIndex={-1}
      id="uni1"
      role={`cell${index + 1}`}
      onKeyDown={(e) => {
        ArrowNavi(e, roleCell, "ArrowRight", "ArrowLeft", 3, "rowCell");
      }}
      onFocus={(e) => {
        dataInc.current = index + 1;
        FocusElement(e.currentTarget, "rowCell", roleCell);
      }}
    >
      <button tabIndex={-1} role="rowCell1">
        play
      </button>
      <span>{name}</span>
      <span>{TimeFormat(duration)}</span>
      <ToggleElement url={url} sege={sege} duration={duration} />
      <button tabIndex={-1} role="rowCell3">
        hello
      </button>
    </div>
  );
}

export default Track;
