import { getSongsReturn, listSongsSection } from "@/database/data";
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
  listSong: listSongsSection;
  id: string;
}
function AudioFunctionShuffle({ className, listSong, id }: Props) {
  const [isShuffle, setIsShuffle] = useState(false);
  const previousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylist) => state.previousPlayListArray
  ) as listSongsSection;

  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];

  const shufflePlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylisthuffleAction) => state.shufflePlayListArray
  );
  const setPreviousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylistAction) => state.setPreviousPlayListArray
  );

  function shuffle() {
    if (!listSong.idArray || listSong.idArray.length === 0) return;

    const currentIndex = outputCurrentIndex(listSong.idArray, id);
    const currentSong = listSong.idArray[currentIndex];
    const excludeCurrentSongsArray = excludeCurrentSongs(
      listSong,
      currentIndex
    );
    const shufflePlaylistOutput = shufflePlaylist(
      excludeCurrentSongsArray,
      isShuffle,
      listSong,
      currentSong,
      previousPlayListArray
    );
    setPreviousPlayListArray(listSong);
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
