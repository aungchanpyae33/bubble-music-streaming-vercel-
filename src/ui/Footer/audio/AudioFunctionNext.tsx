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
  const urlSongs = urlProp.flatMap(({ url }) => url);
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const currentIndex = urlSongs.indexOf(url);
  console.log("audio next");
  function songFunctionNext() {
    const songList = urlProp;
    if (currentIndex >= urlSongs.length - 1) return;
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
