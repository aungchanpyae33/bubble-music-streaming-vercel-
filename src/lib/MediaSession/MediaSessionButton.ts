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
import { getSongsReturn, song } from "@/database/data";
import outputUniUrl from "../CustomHooks/OutputUniUrl";

const MediaSessionButton = (currentUrl: string) => {
  //[todo] need to add more code to align with audiofunction pre and next but can safe remove some code as there will be no ui when page refresh
  // const [playListArrayKey, playListArray] = useRepeatAndCurrentPlayList(
  //   (state: currentSongPlaylist) =>
  //     Object.entries(
  //       state.playListArray as Record<string, getSongsReturn | undefined>
  //     )[0] || []
  // );
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as getSongsReturn;
  console.log(playListArray, "i am playlist");
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
      uni_id,
    }: {
      url: string;
      sege: number;
      duration: number;
      name: string;
      song_time_stamp: number[];
      uni_id?: number | undefined;
    }) {
      const { playlistId, uniUrl } = outputUniUrl(
        playListArray,
        playListArray?.might_repeat,
        uni_id,
        url
      );

      updateSongCu({
        [uniUrl || ""]: url,
        sege,
        duration,
        name,
        song_time_stamp,
      });
      setPlaylistId({ [playlistId || ""]: [playlistId, url] });
      setPlayList(playlistId, true);
      // url is also  keyName
      setPlay(uniUrl || "", true);
    }
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (!playListArray || playListArray.songs.length === 0) return;
        const currentIndex = playListArray.songs.findIndex(
          (song) => song.url === currentUrl
        );
        if (currentIndex <= 0) return;

        const { url, sege, name, duration, song_time_stamp, uni_id } =
          playListArray.songs[currentIndex - 1];
        MediaSessionButtonTaks({
          url,
          sege,
          duration,
          name,
          song_time_stamp,
          uni_id,
        });
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (!playListArray || playListArray.songs.length === 0) return;
        const currentIndex = playListArray.songs.findIndex(
          (song) => song.url === currentUrl
        );
        if (currentIndex >= playListArray.songs.length - 1) return;
        const { url, sege, name, duration, song_time_stamp, uni_id } =
          playListArray.songs[currentIndex + 1];
        MediaSessionButtonTaks({
          url,
          sege,
          duration,
          name,
          song_time_stamp,
          uni_id,
        });
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
    setPlaylistId,
    setPlayList,
  ]);
};
export default MediaSessionButton;
