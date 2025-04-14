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
  urlProp: urlProp[];
  url: string;
}
function AudioFunctionPre({ urlProp, url, className }: Props) {
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  console.log(urlProp);

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  const currentIndex = urlProp.findIndex((song) => song.url === url);

  function songFunctionPre() {
    const songList = urlProp;
    if (currentIndex <= 0) return;
    const { url, sege, duration, name } = songList[currentIndex - 1];

    const uniUrl = `${url},${playlistId[0]}`;
    console.log(uniUrl);
    updateSongCu({ [url || ""]: url, sege, duration, name });
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
