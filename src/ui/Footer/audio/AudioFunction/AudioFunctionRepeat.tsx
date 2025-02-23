import { IsRepeatState, RepeatAction, useRepeat } from "@/lib/zustand";
import clsx from "clsx";

function AudioFunctionRepeat({ isForAudioFull }: { isForAudioFull: boolean }) {
  const isRepeat = useRepeat((state: IsRepeatState) => state.isRepeat);
  const setRepeat = useRepeat((state: RepeatAction) => state.setRepeat);
  return (
    <button
      className={clsx("bg-pink-300 p-2  sm:inline-block text-sm md:text-base", {
        hidden: !isForAudioFull,
      })}
      onClick={() => setRepeat()}
    >
      {isRepeat ? "unre" : "repe"}
    </button>
  );
}

export default AudioFunctionRepeat;
