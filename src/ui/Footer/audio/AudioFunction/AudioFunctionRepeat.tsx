import { IsRepeatState, RepeatAction, useRepeat } from "@/lib/zustand";

function AudioFunctionRepeat({ className }: React.ComponentProps<"button">) {
  const isRepeat = useRepeat((state: IsRepeatState) => state.isRepeat);
  const setRepeat = useRepeat((state: RepeatAction) => state.setRepeat);
  return (
    <button className={className} onClick={() => setRepeat()}>
      {isRepeat ? "unre" : "repe"}
    </button>
  );
}

export default AudioFunctionRepeat;
