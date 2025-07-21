"use client";
import React, { useRef } from "react";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import SetFocusMounted from "@/lib/CustomHooks/SetFocusMounted";
import { twMerge } from "tailwind-merge";

interface SubOptionToggleProps<T> extends React.ComponentProps<"div"> {
  /** Zustand selector type */
  selector: (state: any) => T;
  useStore: (selector: (state: any) => T) => T;
  children: React.ReactNode;
}
const baseStyle =
  "z-50 bg-zinc-800 p-3 rounded-md border border-zinc-500 w-[400px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]";
function SubOptionToggle<T>({
  children,
  selector,
  useStore,
  className,
}: SubOptionToggleProps<T>) {
  const addSongsToPlaylist = useStore(selector) as (value: any) => void;
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
          className={twMerge(baseStyle, className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </FocusTrap>
    </div>
  );
}

export default SubOptionToggle;
