"use client";
import {
  currentSongPlaylist,
  currentSongPlaylistAction,
  DirectPlayBackAction,
  DirectPlayBackState,
  SongActions,
  SongFunctionActions,
  StorePlayListIdState,
  StorePlayListIdStateAction,
  useDirectPlayBack,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
  useStorePlayListId,
} from "@/lib/zustand";
import { RefObject, useRef } from "react";
import IconWrapper from "../general/IconWrapper";
import { Pause, Play } from "lucide-react";
import { getSongsReturn } from "@/database/data";
import outputUniUrl from "@/lib/CustomHooks/OutputUniUrl";
import { getPlaylistSongsApi } from "@/database/dataApi";
const hasData = async (
  dataFromFetch: RefObject<Promise<{
    data: getSongsReturn[] | null;
    error: any;
  }> | null>,
  playlistId: string
) => {
  if (!dataFromFetch.current) {
    dataFromFetch.current = getPlaylistSongsApi(playlistId);
  }
  return dataFromFetch.current;
};
function DirectPlayButton({ playListId }: { playListId: string }) {
  const dataFromFetch = useRef<Promise<{
    data: getSongsReturn[] | null;
    error: any;
  }> | null>(null);

  // toggle playlistfolder
  const IsPlayList = useDirectPlayBack(
    (state: DirectPlayBackState) => state.IsPlayList[playListId || ""]
  );
  // current playlist id and current song
  const playlistId = useStorePlayListId(
    (state: StorePlayListIdState) =>
      (state.playlistId as Record<string, Array<string>>)[playListId || ""]
  );
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) =>
      (state.playListArray as Record<string, getSongsReturn>)[playListId || ""]
  );

  const setPlaylistId = useStorePlayListId(
    (state: StorePlayListIdStateAction) => state.setPlaylistId
  );

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);

  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );
  async function getData() {
    const returnData = await hasData(dataFromFetch, playListId);
    const { data, error } = returnData;
    if (error || !data) return;
    const songsData = data[0];
    return songsData;
  }
  const handlePlayClick = async () => {
    const playlistData = !playlistId ? await getData() : playListArray;
    console.log(playlistData);
    if (playlistData) {
      const currentIndex = (() => {
        if (playlistId) {
          return playlistData.songs.findIndex(
            (song) => song.url === playlistId[1]
          );
        }
        return 0;
      })();
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
      } = (() => {
        if (playlistId) {
          return playlistData.songs[currentIndex];
        }
        return playlistData.songs[0];
      })();
      const { uniUrl } = outputUniUrl(playlistData, uni_id, url);

      setPlayListArray({
        [playListId || ""]: playlistData,
      });
      if (playlistId) {
        setPlay("unknown", undefined);
        setPlayList("unknown", undefined);
        setPlaylistId({
          [playListId || ""]: [playListId, url],
        });
      } else {
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
        setPlaylistId({
          [playListId || ""]: [playListId, url],
        });
        setPlayList(playListId || "", true);
        setPlay(uniUrl || "", true);
      }
    }
  };

  return (
    <button
      className=" absolute z-10 bottom-4 right-2  has-hover:transition-[transform,opacity,background-color] has-hover:duration-150 has-hover:group-hover:-translate-y-2 has-hover:opacity-0 has-hover:peer-focus:-translate-y-2  has-hover:peer-focus:opacity-100 
      has-hover:focus:-translate-y-2 
      has-hover:focus:opacity-100 
      has-hover:group-hover:opacity-100  p-2 bg-[#222222]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handlePlayClick();
      }}
    >
      {IsPlayList ? (
        <IconWrapper className="w-5 h-5 fill-white" Icon={Pause} />
      ) : (
        <IconWrapper className="w-5 h-5 fill-white" Icon={Play} />
      )}
    </button>
  );
}

export default DirectPlayButton;
