import { useSong, useSongFunction } from "@/lib/zustand";
import type { SongActions, SongFunctionActions } from "@/lib/zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import IconWrapper from "@/ui/general/IconWrapper";
import { SkipBack } from "lucide-react";
interface Props extends React.ComponentProps<"button"> {
  urlProp: urlProp[];
  url: string;
}
function AudioFunctionPre({ urlProp, url, className }: Props) {
  // console.log("thats a dope");
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const currentIndex = urlProp.findIndex((song) => song.url === url);

  function songFunctionPre() {
    const songList = urlProp;
    if (currentIndex <= 0) return;
    const { url, sege, duration, name } = songList[currentIndex - 1];
    updateSongCu({ [url || ""]: url, sege, duration, name });
    // url is also  keyName
    setPlay(url || "", true);
  }
  return (
    <button onClick={() => songFunctionPre()} className={className}>
      <IconWrapper size="small" Icon={SkipBack} />
    </button>
  );
}

export default AudioFunctionPre;
