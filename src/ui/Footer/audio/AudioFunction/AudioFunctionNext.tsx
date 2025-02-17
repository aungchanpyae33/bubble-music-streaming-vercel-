import { useSong, useSongFunction } from "@/lib/zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import type { SongActions, SongFunctionActions } from "@/lib/zustand";
function AudioFunctionNext({
  urlProp,
  url,
}: {
  urlProp: urlProp[];
  url: string;
}) {
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
    <button
      onClick={() => songFunctionNext()}
      className="bg-blue-300 p-2 text-sm md:text-base"
    >
      nex
    </button>
  );
}

export default AudioFunctionNext;
