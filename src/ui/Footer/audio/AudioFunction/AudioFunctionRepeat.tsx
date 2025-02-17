import { IsRepeatState, RepeatAction, useRepeat } from "@/lib/zustand";

function AudioFunctionRepeat() {
  const isRepeat = useRepeat((state: IsRepeatState) => state.isRepeat);
  const setRepeat = useRepeat((state: RepeatAction) => state.setRepeat);
  return (
    <button
      className="bg-pink-300 p-2 text-sm md:text-base"
      onClick={() => setRepeat()}
    >
      {isRepeat ? "unre" : "repe"}
    </button>
  );
}

export default AudioFunctionRepeat;
