import {
  useDirectPlayBack,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import type {
  DirectPlayBackAction,
  SongActions,
  SongFunctionActions,
  StorePlayListIdState,
  StorePlayListIdStateAction,
} from "@/lib/zustand";
import { SkipForward } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";
import { getSongsReturn } from "@/database/data";
interface Props extends React.ComponentProps<"button"> {
  urlProp: getSongsReturn;
  url: string;
}
function AudioFunctionNext({ urlProp, url, className }: Props) {
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  // console.log(urlProp);

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  function songFunctionNext(currentUrl: string = url) {
    if (!urlProp.songs || urlProp.songs.length === 0) return;
    const currentIndex = urlProp.songs.findIndex(
      (song) => song.url === currentUrl
    );
    const songList = urlProp.songs;
    console.log(currentIndex);
    if (currentIndex >= urlProp.songs.length - 1) return;
    const { url, sege, duration, name, song_time_stamp } =
      songList[currentIndex + 1];

    const uniUrl = `${url},${playlistId[0]}`;
    console.log(uniUrl);
    updateSongCu({ [url || ""]: url, sege, duration, name, song_time_stamp });
    // [todo] need to check if there is a new playlist or not
    setPlaylistId({ [playlistId[0] || ""]: [playlistId[0], url] });
    setPlayList(playlistId[0], true);
    setPlay(uniUrl || "", true);
  }

  return (
    <button onClick={() => songFunctionNext()} className={className}>
      <IconWrapper Icon={SkipForward} size="small" />
    </button>
  );
}

export default AudioFunctionNext;
