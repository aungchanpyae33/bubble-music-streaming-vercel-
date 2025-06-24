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
import outputUniUrl from "@/lib/CustomHooks/OutputUniUrl";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
interface Props extends React.ComponentProps<"button"> {
  urlProp: getSongsReturn;
  uni_id?: number | undefined;
  url: string;
}
function AudioFunctionNext({ urlProp, url, className, uni_id }: Props) {
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
  function songFunctionNext(currentUrl: string = url, uni_id_scope = uni_id) {
    if (!urlProp.songs || urlProp.songs.length === 0) return;
    const currentIndex = outputCurrentIndex(urlProp, currentUrl, uni_id_scope);
    const songList = urlProp.songs;
    console.log(currentIndex);
    if (currentIndex >= urlProp.songs.length - 1) return;
    const { url, sege, duration, name, song_time_stamp, uni_id } =
      songList[currentIndex + 1];

    const { uniUrl } = outputUniUrl(
      urlProp,
      urlProp?.might_repeat,
      uni_id,
      url
    );
    updateSongCu({
      [uniUrl || ""]: url,
      sege,
      duration,
      name,
      song_time_stamp,
      uni_id,
    });
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
