"use client";
import { useRef } from "react";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import SetFocusMounted from "@/lib/CustomHooks/SetFocusMounted";
import { addSongsToPlaylist, useAddSongsToPlaylist } from "@/lib/zustand";
function SubOptionToggle({ children }: { children: React.ReactNode }) {
  const addSongsToPlaylist = useAddSongsToPlaylist(
    (state: addSongsToPlaylist) => state.addSongsToPlaylist
  );
  const refFocus = useRef<HTMLDivElement>(null);
  SetFocusMounted({ refFocus: refFocus });
  return (
    <div
      className=" fixed inset-0 z-40 bg-black/50"
      onClick={() => addSongsToPlaylist({})}
    >
      <FocusTrap refFocus={refFocus}>
        <div
          tabIndex={0}
          ref={refFocus}
          className=" z-50 bg-zinc-800 p-3 rounded-md border border-zinc-500 w-[400px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </FocusTrap>
    </div>
  );
}

export default SubOptionToggle;
