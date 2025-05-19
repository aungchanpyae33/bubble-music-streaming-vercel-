import { addRecent } from "@/actions/addRecent";
import { getPlaylistSongsReturn } from "@/database/data";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
import {
  currentSongPlaylist,
  DirectPlayBackAction,
  IsRepeatState,
  SongActions,
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
import ToggleButtonSpaceKey from "./audio/Toggle/ToggleButtonSpaceKey";

function PlaceHolderToggleState() {
  const { dataAudio, segNum, loadNextSegment } = useContext(DataContext);
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as getPlaylistSongsReturn;
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0]
  );
  const songCuUrl = useSong(
    (state: SongState) => Object.values(state.songCu)[0]
  );
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  const playlistIdString = playlistId[0];

  const playlistIdName = playlistId[1];
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
      if (dataAudio.current?.readyState) {
        if (Isplay) {
          dataAudio.current.play();
        } else {
          dataAudio.current.pause();
        }
      }
    }

    function playNext() {
      console.log("wok");
      const currentIndex = playListArray.songs.findIndex(
        (song) => song.url === songCuUrl
      );
      if (!isRepeat) {
        const songList = playListArray.songs;
        if (currentIndex >= playListArray.songs.length - 1) return;
        const { url, sege, duration, name } = songList[currentIndex + 1];
        const uniUrl = `${url},${playlistId[0]}`;
        updateSongCu({ [url || ""]: url, sege, duration, name });
        // [todo] need to check if there is a new playlist or not
        setPlaylistId({
          [playlistId[0] || ""]: [playlistId[0], url],
        });
        setPlay(uniUrl || "unknown", true);
        // [todo] need to check if there is a new playlist or not
        setPlayList(playlistId[0] || "unknown", true);
      } else {
        dataAudio!.current!.currentTime = 0;
        segNum.current = 1;
        dataAudio!.current!.play();
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
    songCuUrl,
    setPlaylistId,
  ]);
  useEffect(() => {
    async function addRecentFn() {
      const { error } = await addRecent(playlistIdString, playlistIdName);
    }
    addRecentFn();
  }, [playlistIdString, playlistIdName]);
  return (
    <ToggleButtonSpaceKey
      setPlay={setPlay}
      setPlayList={setPlayList}
      songCuUrl={songCuUrl}
      playlistIdString={playlistIdString}
    />
  );
}

export default PlaceHolderToggleState;
