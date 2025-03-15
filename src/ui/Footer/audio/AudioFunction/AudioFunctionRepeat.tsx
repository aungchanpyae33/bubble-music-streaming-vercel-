import {
  IsRepeatState,
  RepeatAction,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";

function AudioFunctionRepeat({ className }: React.ComponentProps<"button">) {
  const isRepeat = useRepeatAndCurrentPlayList(
    (state: IsRepeatState) => state.isRepeat
  );
  const setRepeat = useRepeatAndCurrentPlayList(
    (state: RepeatAction) => state.setRepeat
  );
  return (
    <button className={className} onClick={() => setRepeat()}>
      {isRepeat ? "unre" : "repe"}
    </button>
  );
}

export default AudioFunctionRepeat;
