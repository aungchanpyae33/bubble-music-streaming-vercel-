import { useEffect } from "react";
import {
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "../zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import type {
  SongFunctionActions,
  SongActions,
  currentSongPlaylist,
  SongDetail,
  DirectPlayBackAction,
  StorePlayListIdStateAction,
} from "../zustand";
import { song } from "@/database/data";

const MediaSessionButton = (currentUrl: string) => {
  //[todo] need to add more code to align with audiofunction pre and next but can safe remove some code as there will be no ui when page refresh
  const [playListArrayKey, playListArray] = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      Object.entries(state.playListArray as Record<string, song[]>)[0] || []
  );

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );

  useEffect(() => {
    function MediaSessionButtonTaks({
      url,
      sege,
      duration,
      name,
      song_time_stamp,
    }: {
      url: string;
      sege: number;
      duration: number;
      name: string;
      song_time_stamp: number[];
    }) {
      const uniUrl = `${url},${playListArrayKey}`;
      console.log(uniUrl);
      updateSongCu({ [url || ""]: url, sege, duration, name, song_time_stamp });
      setPlaylistId({ [playListArrayKey || ""]: [playListArrayKey, url] });
      setPlayList(playListArrayKey, true);
      // url is also  keyName
      setPlay(uniUrl || "", true);
    }
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (!playListArray || playListArray.length === 0) return;
        const currentIndex = playListArray.findIndex(
          (song) => song.url === currentUrl
        );
        if (currentIndex <= 0) return;

        const { url, sege, name, duration, song_time_stamp } =
          playListArray[currentIndex - 1];
        MediaSessionButtonTaks({ url, sege, duration, name, song_time_stamp });
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (!playListArray || playListArray.length === 0) return;
        const currentIndex = playListArray.findIndex(
          (song) => song.url === currentUrl
        );
        if (currentIndex >= playListArray.length - 1) return;
        const { url, sege, name, duration, song_time_stamp } =
          playListArray[currentIndex + 1];
        MediaSessionButtonTaks({ url, sege, duration, name, song_time_stamp });
      });
    }
    return () => {
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
    };
  }, [
    playListArray,
    setPlay,
    updateSongCu,
    currentUrl,
    playListArrayKey,
    setPlaylistId,
    setPlayList,
  ]);
};
export default MediaSessionButton;
