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
import { getSongsReturn } from "@/database/data";
import outputUniUrl from "@/lib/CustomHooks/OutputUniUrl";
import { url } from "inspector";

interface Props extends React.ComponentProps<"button"> {
  urlProp: getSongsReturn;
  url: string;
  uni_id?: number | undefined;
}
function ToggleButton({ urlProp, className, url, uni_id }: Props) {
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0]
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
  const { uniUrl } = outputUniUrl(urlProp, urlProp?.might_repeat, uni_id, url);
  return (
    <button
      className={className}
      id="play-icon"
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        // need to use with key value not undefined as firsetkey that get from isplay preversin is undefined and it will not trigger to the toggleElement
        setPlay(uniUrl, undefined);
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
