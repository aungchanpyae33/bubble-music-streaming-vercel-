import { useEffect } from "react";
import { useCurrentPlayList, useSong, useSongFunction } from "../zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import type {
  SongFunctionActions,
  SongActions,
  currentSongPlaylist,
} from "../zustand";

const MediaSessionButton = (url: string) => {
  const playListArray = useCurrentPlayList(
    (state: currentSongPlaylist) => state.playListArray
  ) as urlProp[];
  console.log(playListArray, "playListArray");
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const currentIndex = playListArray.findIndex((song) => song.url === url);
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        // u.play();
        if (currentIndex <= 0) return;
        const url = playListArray[currentIndex - 1].url;
        const sege = playListArray[currentIndex - 1].sege;
        const duration = playListArray[currentIndex - 1].duration;
        const name = playListArray[currentIndex - 1].name;
        updateSongCu({ [url || ""]: url, sege, duration, name });
        // url is also  keyName
        setPlay(url || "", true);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (currentIndex >= playListArray.length - 1) return;
        const url = playListArray[currentIndex + 1].url;
        const sege = playListArray[currentIndex + 1].sege;
        const duration = playListArray[currentIndex + 1].duration;
        const name = playListArray[currentIndex + 1].name;
        updateSongCu({ [url || ""]: url, sege, duration, name });
        // url is js keyName
        setPlay(url || "", true);
        // forSaleInterlude.play();
      });
    }
  }, [currentIndex, playListArray, setPlay, updateSongCu, urlSongs]);
};
export default MediaSessionButton;
