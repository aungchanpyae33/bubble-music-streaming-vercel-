import shufflePlaylistArray from "@/lib/shufflePlaylistArray";
import {
  currentSongPlaylistAction,
  previousSongPlaylist,
  StorePlayListIdState,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useStorePlayListId,
} from "@/lib/zustand";
import { urlProp } from "@/ui/albumContainer/AudiosContainer";
import IconWrapper from "@/ui/general/IconWrapper";
import clsx from "clsx";
import { Shuffle } from "lucide-react";
import { useState } from "react";
interface Props extends React.ComponentProps<"button"> {
  urlProp: urlProp[];
  url: string;
}
function AudioFunctionShuffle({ className, urlProp, url }: Props) {
  console.log(urlProp);
  // console.log("render");
  const currentIndex = urlProp.findIndex((song) => song.url === url);
  const currentSong = urlProp[currentIndex];
  const excludeCurrentSong = [
    ...urlProp.slice(0, currentIndex),
    ...urlProp.slice(currentIndex + 1),
  ];
  const [isShuffle, setIsShuffle] = useState(false);
  const previousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylist) =>
      Object.values(state.previousPlayListArray)[0] || []
  ) as urlProp[];

  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  const shuffleArray = !isShuffle
    ? [currentSong, ...shufflePlaylistArray(excludeCurrentSong)]
    : previousPlayListArray;
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );

  return (
    <button
      className={className}
      onClick={() => {
        setPlayListArray({
          [playlistId[0] || ""]: shuffleArray,
        });
        setIsShuffle(!isShuffle);
      }}
    >
      {/* {isShuffle ? "unSh" : "Shu"} */}
      <IconWrapper
        Icon={Shuffle}
        size="small"
        className={clsx("", {
          "text-orange-300": isShuffle,
        })}
      />
    </button>
  );
}

export default AudioFunctionShuffle;
