import {
  useDirectPlayBack,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";

import type {
  DirectPlayBackAction,
  SongActions,
  SongFunctionActions,
  StorePlayListIdState,
  StorePlayListIdStateAction,
} from "@/lib/zustand";
import { SkipForward } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";
import { listSongsSection } from "@/database/data";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
import { HlsDirectPlay } from "@/lib/HlsDirectPlay";
import { useContext } from "react";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
interface Props extends React.ComponentProps<"button"> {
  listSong: listSongsSection;
  id: string;
}
function AudioFunctionNext({ listSong, className, id }: Props) {
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  // console.log(urlProp);
  const { dataAudio } = useContext(DataContext);
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  function songFunctionNext(id_scope = id) {
    if (!listSong.songs || listSong.idArray.length === 0) return;
    const currentIndex = outputCurrentIndex(listSong.idArray, id_scope);
    const songList = listSong.songs;

    if (currentIndex >= listSong.idArray.length - 1) return;
    const {
      url,
      sege,
      duration,
      name,
      song_time_stamp,
      id,
      song_id,
      artists,
      is_lyric,
      cover_url,
    } = songList[listSong.idArray[currentIndex + 1]];

    const uniUrl = id;
    updateSongCu({
      [uniUrl || ""]: url,
      sege,
      duration,
      name,
      song_time_stamp,
      id,
      song_id,
      artists,
      is_lyric,
      cover_url,
    });
    // [todo] need to check if there is a new playlist or not
    setPlaylistId({ [playlistId[0] || ""]: [playlistId[0], id] });
    setPlayList(playlistId[0], true);
    setPlay(uniUrl || "", true);
    HlsDirectPlay(url, dataAudio);
  }

  return (
    <button onClick={() => songFunctionNext()} className={className}>
      <IconWrapper Icon={SkipForward} size="small" />
    </button>
  );
}

export default AudioFunctionNext;
