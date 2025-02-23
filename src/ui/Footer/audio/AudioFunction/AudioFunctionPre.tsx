import { useSong, useSongFunction } from "@/lib/zustand";
import type { SongActions, SongFunctionActions } from "@/lib/zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import clsx from "clsx";

function AudioFunctionPre({
  urlProp,
  url,
  isForAudioFull,
}: {
  urlProp: urlProp[];
  url: string;
  isForAudioFull: boolean;
}) {
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
    <button
      onClick={() => songFunctionPre()}
      className={clsx("bg-blue-300 p-2 text-sm  sm:inline-block md:text-base", {
        hidden: !isForAudioFull,
      })}
    >
      pre
    </button>
  );
}

export default AudioFunctionPre;
