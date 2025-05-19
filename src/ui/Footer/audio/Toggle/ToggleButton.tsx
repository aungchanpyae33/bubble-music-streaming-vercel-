import {
  useDirectPlayBack,
  useSong,
  useSongFunction,
  useStorePlayListId,
  // useStorePlayListId,
} from "@/lib/zustand";
import type {
  SongFunctionState,
  SongFunctionActions,
  DirectPlayBackAction,
  SongState,
  StorePlayListIdState,
} from "@/lib/zustand";
import { Pause, Play } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";
import { getPlaylistSongsReturn } from "@/database/data";

interface Props extends React.ComponentProps<"button"> {
  urlProp: getPlaylistSongsReturn;
}
function ToggleButton({ urlProp, className }: Props) {
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0]
  );
  const songCuUrl = useSong(
    (state: SongState) => Object.values(state.songCu)[0]
  );
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  const playlistIdString = playlistId[0];

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
        setPlay(`${songCuUrl},${playlistIdString}`, undefined);
        setPlayList(playlistIdString, undefined);
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
