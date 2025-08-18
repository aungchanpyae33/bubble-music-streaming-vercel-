import { DataContext } from "@/lib/MediaSource/ContextMedia";
import {
  currentSongPlaylist,
  DirectPlayBackAction,
  IsRepeatState,
  SongActions,
  SongDetail,
  SongFunctionActions,
  SongFunctionState,
  SongState,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import { useContext, useEffect } from "react";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
import { listSongsSection } from "@/database/data";
import { addRecentlyPlayedList } from "@/actions/addRecentPlayedList";
import { addRecentlySong } from "@/actions/addRecentSong";

function PlaceHolderToggleState({
  url,
  id,
  children,
}: {
  url: string;
  id: string;
  children: React.ReactNode;
}) {
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

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );

  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );

  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const isRepeat = useRepeatAndCurrentPlayList(
    (state: IsRepeatState) => state.isRepeat
  );
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
        });
        // [todo] need to check if there is a new playlist or not
        setPlaylistId({
          [playlistId[0] || ""]: [playlistId[0], id],
        });
        setPlay(uniUrl, true);
        // [todo] need to check if there is a new playlist or not
        setPlayList(playlistId[0], true);
      }
    }
    // console.log("whyyyyyyyyyyyy");
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
      if (playListArray.id.startsWith("create-on-fly")) return;
      const { error } = await addRecentlyPlayedList(
        playListArray.id,
        playListArray.type
      );
      if (error) console.log(error);
    }
    addRecentList();
  }, [playListArray.id, playListArray.type]);

  useEffect(() => {
    async function addRecentSong() {
      const { error } = await addRecentlySong(song_id);
      if (error) console.log(error);
    }
    addRecentSong();
  }, [song_id]);

  return children;
}

export default PlaceHolderToggleState;
