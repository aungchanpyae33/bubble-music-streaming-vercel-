import { RefObject, useEffect } from "react";
import {
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "../zustand";
import type {
  SongFunctionActions,
  SongActions,
  currentSongPlaylist,
  DirectPlayBackAction,
  StorePlayListIdStateAction,
} from "../zustand";
import { Artist, listSongsSection } from "@/database/data";
import outputCurrentIndex from "../CustomHooks/OutputCurrentIndex";
import { HlsDirectPlay } from "../HlsDirectPlay";

const MediaSessionButton = (
  id_scope: string,
  audioEl: RefObject<HTMLAudioElement | null>
) => {
  //[todo] need to add more code to align with audiofunction pre and next but can safe remove some code as there will be no ui when page refresh
  // const [playListArrayKey, playListArray] = useRepeatAndCurrentPlayList(
  //   (state: currentSongPlaylist) =>
  //     Object.entries(
  //       state.playListArray as Record<string, getSongsReturn | undefined>
  //     )[0] || []
  // );
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as listSongsSection;
  // console.log(playListArray, "i am playlist");
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
      id,
      song_id,
      is_liked,
      artists,
      is_lyric,
      cover_url,
    }: {
      url: string;
      sege: number;
      duration: number;
      name: string;
      song_time_stamp: number[];
      id: string;
      song_id: string;
      is_liked: boolean;
      artists: Artist[];
      is_lyric: boolean;
      cover_url: string;
    }) {
      const playlistId = playListArray.id;
      const uniUrl = id;
      updateSongCu({
        [uniUrl || ""]: url,
        sege,
        duration,
        name,
        song_time_stamp,
        id,
        song_id,
        is_liked,
        artists,
        is_lyric,
        cover_url,
      });
      setPlaylistId({ [playlistId || ""]: [playlistId, id] });
      setPlayList(playlistId, true);
      // url is also  keyName
      setPlay(uniUrl || "", true);
      HlsDirectPlay(url, audioEl);
    }
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        if (!playListArray || playListArray.idArray.length === 0) return;
        const currentIndex = outputCurrentIndex(
          playListArray.idArray,
          id_scope
        );
        if (currentIndex <= 0) return;

        const {
          url,
          sege,
          name,
          duration,
          song_time_stamp,
          id,
          song_id,
          is_liked,
          artists,
          is_lyric,
          cover_url,
        } = playListArray.songs[playListArray.idArray[currentIndex - 1]];
        MediaSessionButtonTaks({
          url,
          sege,
          duration,
          name,
          song_time_stamp,
          id,
          song_id,
          is_liked,
          artists,
          is_lyric,
          cover_url,
        });
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        if (!playListArray || playListArray.idArray.length === 0) return;
        const currentIndex = outputCurrentIndex(
          playListArray.idArray,
          id_scope
        );
        if (currentIndex >= playListArray.idArray.length - 1) return;
        const {
          url,
          sege,
          name,
          duration,
          song_time_stamp,
          id,
          song_id,
          is_liked,
          artists,
          is_lyric,
          cover_url,
        } = playListArray.songs[playListArray.idArray[currentIndex + 1]];
        MediaSessionButtonTaks({
          url,
          sege,
          duration,
          name,
          song_time_stamp,
          id,
          song_id,
          is_liked,
          artists,
          is_lyric,
          cover_url,
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
    id_scope,
    setPlaylistId,
    setPlayList,
    audioEl,
  ]);
};
export default MediaSessionButton;
