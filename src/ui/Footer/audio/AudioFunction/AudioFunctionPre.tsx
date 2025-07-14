import { getSongsReturn } from "@/database/data";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
import outputUniUrl from "@/lib/CustomHooks/OutputUniUrl";
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
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import IconWrapper from "@/ui/general/IconWrapper";
import { SkipBack } from "lucide-react";
interface Props extends React.ComponentProps<"button"> {
  urlProp: getSongsReturn;
  uni_id?: string | undefined;
  url: string;
}
function AudioFunctionPre({ urlProp, url, className, uni_id }: Props) {
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

  function songFunctionPre(currentUrl: string = url, uni_id_scope = uni_id) {
    if (!urlProp.songs || urlProp.songs.length === 0) return;
    const currentIndex = outputCurrentIndex(urlProp, currentUrl, uni_id_scope);
    const songList = urlProp.songs;
    if (currentIndex <= 0) return;
    const {
      url,
      sege,
      duration,
      name,
      song_time_stamp,
      id,
      uni_id,
      is_liked,
      artists,
    } = songList[currentIndex - 1];

    const { uniUrl } = outputUniUrl(urlProp, uni_id, url);
    updateSongCu({
      [uniUrl || ""]: url,
      sege,
      duration,
      name,
      song_time_stamp,
      id,
      uni_id,
      is_liked,
      artists,
    });
    // [todo] need to check if there is a new playlist or not
    setPlaylistId({ [playlistId[0] || ""]: [playlistId[0], url] });
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
