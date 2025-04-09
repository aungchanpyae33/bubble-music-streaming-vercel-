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

const MediaSessionButton = (currentUrl: string) => {
  //[todo] need to add more code to align with audiofunction pre and next but can safe remove some code as there will be no ui when page refresh
  const [playListArrayKey, playListArray] = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      Object.entries(state.playListArray as Record<string, urlProp[]>)[0] || []
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
    }: {
      url: string;
      sege: number;
      duration: number;
      name: string;
    }) {
      const uniUrl = `${url},${playListArrayKey}`;
      console.log(uniUrl);
      updateSongCu({ [url || ""]: url, sege, duration, name });
      setPlaylistId({ [playListArrayKey || ""]: [playListArrayKey, url] });
      setPlayList(playListArrayKey, true);
      // url is also  keyName
      setPlay(uniUrl || "", true);
    }
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        console.log(currentUrl);
        const currentIndex = playListArray.findIndex(
          (song) => song.url === currentUrl
        );
        if (currentIndex <= 0) return;

        const { url, sege, name, duration } = playListArray[currentIndex - 1];
        MediaSessionButtonTaks({ url, sege, duration, name });
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        const currentIndex = playListArray.findIndex(
          (song) => song.url === currentUrl
        );
        if (currentIndex >= playListArray.length - 1) return;
        const { url, sege, name, duration } = playListArray[currentIndex + 1];
        MediaSessionButtonTaks({ url, sege, duration, name });
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
