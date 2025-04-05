import { useSong, useSongFunction } from "@/lib/zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import type { SongActions, SongFunctionActions } from "@/lib/zustand";
import { SkipForward } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";
interface Props extends React.ComponentProps<"button"> {
  urlProp: urlProp[];
  url: string;
}
function AudioFunctionNext({ urlProp, url, className }: Props) {
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);

  const currentIndex = urlProp.findIndex((song) => song.url === url);
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );

  function songFunctionNext() {
    const songList = urlProp;
    console.log(currentIndex);
    if (currentIndex >= urlProp.length - 1) return;
    const { url, sege, duration, name } = songList[currentIndex + 1];
    updateSongCu({ [url || ""]: url, sege, duration, name });
    // url is js keyName
    setPlay(url || "", true);
  }

  return (
    <button onClick={() => songFunctionNext()} className={className}>
      <IconWrapper Icon={SkipForward} size="small" />
    </button>
  );
}

export default AudioFunctionNext;
