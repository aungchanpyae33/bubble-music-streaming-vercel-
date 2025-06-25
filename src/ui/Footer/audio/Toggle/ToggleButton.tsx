import {
  useDirectPlayBack,
  useSongFunction,
  // useStorePlayListId,
} from "@/lib/zustand";
import type {
  SongFunctionState,
  SongFunctionActions,
  DirectPlayBackAction,
} from "@/lib/zustand";
import { Pause, Play } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";

interface Props extends React.ComponentProps<"button"> {}
function ToggleButton({ className }: Props) {
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0]
  );

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );

  return (
    <button
      className={className}
      id="play-icon"
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        // need to use with key value not undefined as firsetkey that get from isplay preversin is undefined and it will not trigger to the toggleElement
        setPlay("unknown", undefined);
        setPlayList("unknown", undefined);
      }}
    >
      {Isplay ? (
        <IconWrapper size="large" Icon={Pause} />
      ) : (
        <IconWrapper size="large" Icon={Play} />
      )}
    </button>
  );
}

export default ToggleButton;
