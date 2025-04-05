import shufflePlaylistArray from "@/lib/shufflePlaylistArray";
import {
  currentSongPlaylistAction,
  previousSongPlaylist,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
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
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );

  return (
    <button
      className={className}
      onClick={() => {
        setPlayListArray(shuffleArray);
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
