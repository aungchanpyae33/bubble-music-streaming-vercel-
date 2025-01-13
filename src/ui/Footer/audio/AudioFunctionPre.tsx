import { useSong, useSongFunction } from "@/lib/zustand";
import type { SongActions, SongFunctionActions } from "@/lib/zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";

function AudioFunctionPre({
  urlProp,
  url,
}: {
  urlProp: urlProp[];
  url: string;
}) {
  console.log("audio pre");
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const urlSongs = urlProp.flatMap(({ url }) => url);
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const currentIndex = urlSongs.indexOf(url);

  function songFunctionPre() {
    const songList = urlProp;
    if (currentIndex <= 0) return;
    const url = songList[currentIndex - 1].url;
    const sege = songList[currentIndex - 1].sege;
    const duration = songList[currentIndex - 1].duration;
    const name = songList[currentIndex - 1].name;
    updateSongCu({ [url || ""]: url, sege, duration, name });
    // url is also  keyName
    setPlay(url || "", true);
  }
  return (
    <button
      onClick={() => songFunctionPre()}
      className="bg-blue-300 p-2 text-sm md:text-base"
    >
      pre
    </button>
  );
}

export default AudioFunctionPre;
