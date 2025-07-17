import { addRecent } from "@/actions/addRecent";
import { getSongsReturn } from "@/database/data";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
import {
  currentSongPlaylist,
  currentSongPlaylistAction,
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
import { supabase } from "@/database/supabase";
import outputUniUrl from "@/lib/CustomHooks/OutputUniUrl";
import outputCurrentIndex from "@/lib/CustomHooks/OutputCurrentIndex";

function PlaceHolderToggleState({
  url,
  uni_id,
  children,
}: {
  url: string;
  uni_id: string;
  children: React.ReactNode;
}) {
  const { dataAudio, segNum, loadNextSegment } = useContext(DataContext);
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      Object.values(state.playListArray)[0] || undefined
  ) as getSongsReturn;
  // console.log(playListArray, "adad");
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0]
  );
  const { id, name } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;

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
      if (!playListArray.songs || playListArray.songs.length === 0) return;
      const currentIndex = outputCurrentIndex(playListArray, url, uni_id);
      if (!isRepeat) {
        const songList = playListArray.songs;
        if (currentIndex >= playListArray.songs.length - 1) return;
        const {
          url,
          sege,
          duration,
          name,
          song_time_stamp,
          id,
          uni_id,
          is_liked,
          artists,
        } = songList[currentIndex + 1];
        const { uniUrl } = outputUniUrl(playListArray, uni_id, url);
        updateSongCu({
          [uniUrl || ""]: url,
          sege,
          duration,
          name,
          song_time_stamp,
          id,
          uni_id,
          is_liked,
          artists,
        });
        // [todo] need to check if there is a new playlist or not
        setPlaylistId({
          [playlistId[0] || ""]: [playlistId[0], url],
        });
        setPlay(uniUrl, true);
        // [todo] need to check if there is a new playlist or not
        setPlayList(playlistId[0], true);
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
    url,
    uni_id,
    setPlaylistId,
  ]);
  useEffect(() => {
    async function addRecentFn() {
      // console.log("bolder");
      // const { error } = await addRecent(playlistIdString, playlistIdName);
    }
    addRecentFn();
  }, [playlistIdString, playlistIdName]);

  useEffect(() => {
    if (Isplay && !playListArray) {
      console.log("time to fetchsome");
      async function get() {
        const { data, error } = await supabase.rpc("get_similar_songs", {
          input_song_id: id,
          similarity_threshold: 0.3,
        });
        const data1 = {
          id: `create-on-fly-${name}`,
          name: "autogenerate",
          related_id: "smooth",
          realted_name: "autogenerate",
          source: "none",
          songs: data,
        };
        setPlayListArray({
          ["smooth"]: data1,
        });
      }
      console.log(get());
    }
  }, [Isplay, playListArray, id, setPlayListArray, name]);
  return children;
}

export default PlaceHolderToggleState;
