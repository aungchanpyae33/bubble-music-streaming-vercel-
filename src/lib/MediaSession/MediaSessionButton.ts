import { useEffect } from "react";
import {
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
} from "../zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import type {
  SongFunctionActions,
  SongActions,
  currentSongPlaylist,
  SongDetail,
} from "../zustand";

const MediaSessionButton = (url: string) => {
  //[todo] need to add more code to align with audiofunction pre and next but can safe remove some code as there will be no ui when page refresh
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0]
  ) as urlProp[];

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const currentIndex = 0;
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("previoustrack", () => {
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
    return () => {
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
    };
  }, [currentIndex, playListArray, setPlay, updateSongCu]);
};
export default MediaSessionButton;
