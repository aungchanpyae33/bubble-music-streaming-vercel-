import { listSongsSection } from "@/database/data";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
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
import IconWrapper from "@/ui/general/IconWrapper";
import { SkipBack } from "lucide-react";
interface Props extends React.ComponentProps<"button"> {
  listSong: listSongsSection;
  id: string;
}
function AudioFunctionPre({ listSong, className, id }: Props) {
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  // console.log(listSong);

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );

  function songFunctionPre(id_scope = id) {
    if (!listSong.songs || listSong.idArray.length === 0) return;
    const currentIndex = outputCurrentIndex(listSong.idArray, id_scope);
    const songList = listSong.songs;
    if (currentIndex <= 0) return;
    const {
      url,
      sege,
      duration,
      name,
      song_time_stamp,
      id,
      song_id,
      is_liked,
      artists,
      is_lyric,
    } = songList[listSong.idArray[currentIndex - 1]];

    const uniUrl = id;
    updateSongCu({
      [uniUrl || ""]: url,
      sege,
      duration,
      name,
      song_time_stamp,
      id,
      song_id,
      is_liked,
      artists,
      is_lyric,
    });
    // [todo] need to check if there is a new playlist or not
    setPlaylistId({ [playlistId[0] || ""]: [playlistId[0], id] });
    setPlayList(playlistId[0], true);
    setPlay(uniUrl || "", true);
  }
  return (
    <button onClick={() => songFunctionPre()} className={className}>
      <IconWrapper size="small" Icon={SkipBack} />
    </button>
  );
}

export default AudioFunctionPre;
