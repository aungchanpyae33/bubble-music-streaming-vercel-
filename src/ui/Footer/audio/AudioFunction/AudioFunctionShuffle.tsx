import { getSongsReturn } from "@/database/data";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
import excludeCurrentSongs from "@/lib/excludeCurrentSongs";
import shufflePlaylist from "@/lib/shufflePlaylist";
import {
  currentSongPlaylistAction,
  currentSongPlaylisthuffleAction,
  previousSongPlaylist,
  previousSongPlaylistAction,
  StorePlayListIdState,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useStorePlayListId,
} from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import clsx from "clsx";
import { Shuffle } from "lucide-react";
import { useState } from "react";
interface Props extends React.ComponentProps<"button"> {
  urlProp: getSongsReturn;
  uni_id?: string | undefined;
  url: string;
}
function AudioFunctionShuffle({ className, urlProp, url, uni_id }: Props) {
  const [isShuffle, setIsShuffle] = useState(false);
  const previousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylist) => state.previousPlayListArray
  ) as getSongsReturn;

  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];

  const shufflePlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylisthuffleAction) => state.shufflePlayListArray
  );
  const setPreviousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylistAction) => state.setPreviousPlayListArray
  );

  function shuffle(currentUrl: string = url) {
    if (!urlProp.songs || urlProp.songs.length === 0) return;

    const currentIndex = outputCurrentIndex(urlProp, currentUrl, uni_id);
    const currentSong = urlProp.songs[currentIndex];
    const excludeCurrentSongsArray = excludeCurrentSongs(urlProp, currentIndex);
    const shufflePlaylistOutput = shufflePlaylist(
      excludeCurrentSongsArray,
      isShuffle,
      urlProp,
      currentSong,
      previousPlayListArray
    );
    setPreviousPlayListArray(urlProp);
    shufflePlayListArray({
      [playlistId[0] || ""]: shufflePlaylistOutput,
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
