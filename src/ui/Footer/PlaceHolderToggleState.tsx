import { DataContext } from "@/lib/MediaSource/ContextMedia";
import {
  currentSongPlaylist,
  DirectPlayBackAction,
  IsRepeatState,
  SetListTrackAction,
  SetSongTrackAction,
  SongActions,
  SongDetail,
  SongFunctionActions,
  SongFunctionState,
  SongState,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useListTrack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useSongTrack,
  useStorePlayListId,
} from "@/lib/zustand";
import { useContext, useEffect, useRef } from "react";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
import { listSongsSection } from "@/database/data";
import { addRecentlyPlayedList } from "@/actions/addRecentPlayedList";
import { addRecentlySong } from "@/actions/addRecentSong";
import { useQueryClient } from "@tanstack/react-query";
import { HlsDirectPlay } from "@/lib/HlsDirectPlay";

function PlaceHolderToggleState({
  url,
  id,
  children,
}: {
  url: string;
  id: string;
  children: React.ReactNode;
}) {
  const setTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setTimeoutRefForList = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const { dataAudio, segNum, loadNextSegment } = useContext(DataContext);
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      Object.values(state.playListArray)[0] || undefined
  ) as listSongsSection;
  // console.log(playListArray, "adad");
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0]
  );
  const { song_id } = useSong((state: SongState) => state.songCu) as SongDetail;

  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  const { id: list_id, type } = playListArray;
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setListTrack = useListTrack(
    (state: SetListTrackAction) => state.setListTrack
  );
  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  const setSongTrack = useSongTrack(
    (state: SetSongTrackAction) => state.setSongTrack
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const isRepeat = useRepeatAndCurrentPlayList(
    (state: IsRepeatState) => state.isRepeat
  );
  const queryClient = useQueryClient();
  useEffect(() => {
    const copyDataAudio = dataAudio!.current!;
    function handlePlay() {
      if (
        dataAudio.current &&
        dataAudio.current.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA
      ) {
        if (Isplay) {
          if (dataAudio.current.paused) {
            dataAudio.current.play();
          }
        } else {
          if (!dataAudio.current.paused) {
            dataAudio.current.pause();
          }
        }
      }
    }

    function playNext() {
      if (isRepeat) {
        dataAudio!.current!.currentTime = 0;
        segNum.current = 1;
        dataAudio!.current!.play();
        return;
      }
      if (!playListArray.idArray || playListArray.idArray.length === 0) return;
      const currentIndex = Math.min(
        outputCurrentIndex(playListArray.idArray, id),
        playListArray.idArray.length - 1
      );
      const nextIndex = Math.min(
        currentIndex + 1,
        playListArray.idArray.length - 1
      );
      if (!isRepeat) {
        const songList = playListArray.songs;
        const {
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
        } = songList[playListArray.idArray[nextIndex]];
        const uniUrl = id;
        if (currentIndex >= playListArray.idArray.length - 1 && uniUrl === id) {
          setPlay("unknown", undefined);
          setPlayList("unknown", undefined);
          return;
        }
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
        // [todo] need to check if there is a new playlist or not
        setPlaylistId({
          [playlistId[0] || ""]: [playlistId[0], id],
        });
        setPlay(uniUrl, true);
        // [todo] need to check if there is a new playlist or not
        setPlayList(playlistId[0], true);
        HlsDirectPlay(url, dataAudio);
      }
    }

    handlePlay();
    copyDataAudio.addEventListener("ended", playNext);
    return () => {
      copyDataAudio.removeEventListener("ended", playNext);
    };
  }, [
    Isplay,
    dataAudio,
    setPlay,
    updateSongCu,
    isRepeat,
    segNum,
    loadNextSegment,
    setPlayList,
    playListArray,
    playlistId,
    url,
    id,
    setPlaylistId,
  ]);

  useEffect(() => {
    async function addRecentList() {
      if (list_id.startsWith("create-on-fly")) return;
      if (type === "track") return;
      const { data: recentList, error } = await addRecentlyPlayedList(
        list_id,
        type
      );
      if (!recentList || error) return;
      queryClient.setQueryData(["recentlyPlayed"], recentList);
      //to prevent fast skip case
      if (setTimeoutRefForList.current) {
        clearTimeout(setTimeoutRefForList.current);
        setTimeoutRefForList.current = null;
        return;
      }

      setTimeoutRefForList.current = setTimeout(() => {
        if (setTimeoutRefForList.current) {
          setListTrack(list_id as "playlist" | "artist" | "album", type);
        }
      }, 60000);
    }
    addRecentList();
  }, [list_id, type, setListTrack, queryClient]);
  //to prevent fast skipping song to add many times and user fast skip songs should not store in user perference
  useEffect(() => {
    function addRecentSong() {
      //to prevent fast skip case
      if (setTimeoutRef.current) {
        clearTimeout(setTimeoutRef.current);
        setTimeoutRef.current = null;
        return;
      }
      setTimeoutRef.current = setTimeout(async () => {
        if (setTimeoutRef.current) {
          await addRecentlySong(song_id);
          // if (error) console.log(error);
          setSongTrack(song_id);
        }
      }, 10000);
    }
    addRecentSong();
  }, [song_id, setSongTrack]);

  return children;
}

export default PlaceHolderToggleState;
