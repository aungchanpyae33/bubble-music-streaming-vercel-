import shufflePlaylistArray from "@/lib/shufflePlaylistArray";
import {
  currentSongPlaylistAction,
  previousSongPlaylist,
  useCurrentPlayList,
  usePreviousPlayList,
} from "@/lib/zustand";
import { urlProp } from "@/ui/albumContainer/AudiosContainer";
import clsx from "clsx";
import { useState } from "react";
interface Props extends React.ComponentProps<"button"> {
  urlProp: urlProp[];
  url: string;
}
function AudioFunctionShuffle({ className, urlProp, url }: Props) {
  // console.log("render");
  const currentIndex = urlProp.findIndex((song) => song.url === url);
  const currentSong = urlProp[currentIndex];
  const excludeCurrentSong = [
    ...urlProp.slice(0, currentIndex),
    ...urlProp.slice(currentIndex + 1),
  ];
  const [isShuffle, setIsShuffle] = useState(false);
  const previousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylist) => state.previousPlayListArray
  );

  const shuffleArray = !isShuffle
    ? [currentSong, ...shufflePlaylistArray(excludeCurrentSong)]
    : previousPlayListArray;
  const setPlayListArray = useCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );

  return (
    <button
      className={className}
      onClick={() => {
        console.log(shuffleArray);
        setPlayListArray(shuffleArray);
        setIsShuffle(!isShuffle);
      }}
    >
      {isShuffle ? "unSh" : "Shu"}
    </button>
  );
}

export default AudioFunctionShuffle;
