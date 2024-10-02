import { useEffect } from "react";
import { currentPlayList, Song, SongFunction } from "../zustand";
import { urlProp } from "@/ui/albumContainer/Album";

const MediaSessionButton = (url: string) => {
  const playListArray = currentPlayList(
    (state: any) => state.playListArray
  ) as urlProp[];
  const setPlay = SongFunction((state: any) => state.setPlay);
  const updateSongCu = Song((state: any) => state.updateSongCu);
  const urlSongs = playListArray.flatMap(({ urlSong }) => urlSong);

  // console.log(urlSongs);
  const currentIndex = urlSongs.indexOf(url);
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        // u.play();
        if (currentIndex <= 0) return;
        const url = playListArray[currentIndex - 1].urlSong;
        const sege = playListArray[currentIndex - 1].sege;
        const duration = playListArray[currentIndex - 1].duration;
        const name = playListArray[currentIndex - 1].name;
        updateSongCu({ [url || ""]: url, sege, duration, name });
        // url is also  keyName
        setPlay(url || "", true);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (currentIndex >= urlSongs.length - 1) return;
        const url = playListArray[currentIndex + 1].urlSong;
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
