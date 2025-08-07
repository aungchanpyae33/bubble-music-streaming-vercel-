import { DataContext } from "@/lib/MediaSource/ContextMedia";
import {
  currentAddToQueueAction,
  currentSongPlaylist,
  currentSongPlaylistAction,
  DirectPlayBackAction,
  IsRepeatState,
  ShouldFetchSongsListId,
  SongActions,
  SongDetail,
  SongFunctionActions,
  SongFunctionState,
  SongState,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useShouldFetchSongsList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import { useContext, useEffect, useRef } from "react";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";
import { generateUUID } from "@/lib/GenerateUUID";
import { getSimilarSongQueue } from "@/database/client-data";
import { listSongsSection } from "@/database/data";

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
  const FetchSongsListIdPreRef = useRef<string | null>(null);
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      Object.values(state.playListArray)[0] || undefined
  ) as listSongsSection;
  // console.log(playListArray, "adad");
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0]
  );
  const { song_id, name } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;
  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue
  );
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) => Object.values(state.playlistId)[0] || []
  ) as string[];
  const playlistIdString = playlistId[0];
  const FetchSongsListId = useShouldFetchSongsList(
    (state: ShouldFetchSongsListId) => state.FetchSongsListId
  );
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
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
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
  // useEffect(() => {
  //   async function addRecentFn() {
  //     // console.log("bolder");
  //     // const { error } = await addRecent(playlistIdString, playlistIdName);
  //   }
  //   addRecentFn();
  // }, [playlistIdString, playlistIdName]);

  // useEffect(() => {
  //   console.log(
  //     FetchSongsListId,
  //     FetchSongsListIdPreRef.current,
  //     FetchSongsListId
  //   );
  //   (async () => {
  //     if (
  //       FetchSongsListId &&
  //       FetchSongsListIdPreRef.current !== FetchSongsListId
  //     ) {
  //       const { data, error } = await getSimilarSongQueue(id);
  //       if (!data || error) return null;
  //       console.log("run");
  //       const updatedSongs = data.map((song) => ({
  //         ...song,
  //         uni_id: generateUUID(),
  //       }));
  //       if (
  //         FetchSongsListId &&
  //         FetchSongsListIdPreRef.current !== FetchSongsListId
  //       ) {
  //       console.log("run twice");
  //       currentAddToQueue(updatedSongs);
  //       }

  //       FetchSongsListIdPreRef.current = FetchSongsListId;
  //     }
  //   })();
  // }, [id, FetchSongsListId, currentAddToQueue]);
  return children;
}

export default PlaceHolderToggleState;
