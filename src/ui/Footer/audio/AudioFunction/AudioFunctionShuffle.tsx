import { getSongsReturn } from "@/database/data";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
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
  urlProp: getSongsReturn;
  uni_id?: number | undefined;
  url: string;
}
function AudioFunctionShuffle({ className, urlProp, url, uni_id }: Props) {
  const [isShuffle, setIsShuffle] = useState(false);
  const previousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylist) =>
      Object.values(state.previousPlayListArray)[0] || []
  ) as urlProp[];

  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];

  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );
  function shuffle(currentUrl: string = url) {
    if (!urlProp.songs || urlProp.songs.length === 0) return;
    const currentIndex = outputCurrentIndex(urlProp, currentUrl, uni_id);
    const currentSong = urlProp.songs[currentIndex];
    const excludeCurrentSong = [
      ...urlProp.songs.slice(0, currentIndex),
      ...urlProp.songs.slice(currentIndex + 1),
    ];
    const shuffleArray = !isShuffle
      ? [currentSong, ...shufflePlaylistArray(excludeCurrentSong)]
      : previousPlayListArray;
    setPlayListArray({
      [playlistId[0] || ""]: shuffleArray,
    });
    setIsShuffle(!isShuffle);
  }
  return (
    <button className={className} onClick={() => shuffle()}>
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
