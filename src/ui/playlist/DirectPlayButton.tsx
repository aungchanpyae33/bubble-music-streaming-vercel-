"use client";
import {
  currentSongPlaylistAction,
  DirectPlayBackAction,
  DirectPlayBackState,
  DirectPlayBackStorePlayListId,
  previousSongPlaylistAction,
  SongActions,
  SongDetail,
  SongFunctionActions,
  SongFunctionState,
  useDirectPlayBack,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
} from "@/lib/zustand";
import { playlistProp } from "../albumContainer/AudiosContainer";
import { RefObject, useRef } from "react";

const hasData = async (
  dataFromFetch: RefObject<Promise<playlistProp> | null>
) => {
  if (!dataFromFetch.current) {
    dataFromFetch.current = fetch("/api/getPlaylistData").then((res) =>
      res.json()
    );
  }
  return dataFromFetch.current;
};
function DirectPlayButton({ playListId }: { playListId: string }) {
  const dataFromFetch = useRef<Promise<playlistProp> | null>(null);
  const IsPlayList = useDirectPlayBack(
    (state: DirectPlayBackState) => state.IsPlayList[playListId || ""]
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );
  const playListIdZu = useDirectPlayBack(
    (state: DirectPlayBackStorePlayListId) => state.playListIdZu
  );
  const setPreviousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylistAction) => state.setPreviousPlayListArray
  );
  const handlePlayClick = async () => {
    console.log(dataFromFetch.current);
    const playlistData = await hasData(dataFromFetch);

    if (playlistData) {
      const { url, sege, duration, name } = playlistData.song[0];
      const uniUrl = `${url},${playListId}`;
      setPreviousPlayListArray(playlistData.song);
      setPlayListArray(playlistData.song);
      console.log("wh");
      console.log(playListId, playListIdZu.current);
      if (playListId === playListIdZu.current) {
        console.log("i got toggle");
        setPlay("unknown", undefined);
        setPlayList(playListId || "", undefined);
      } else {
        playListIdZu.current = playlistData.playlistId.toString();
        updateSongCu({ [url || ""]: url, sege, duration, name });
        setPlayList(playListId || "", true);
        setPlay(uniUrl || "", true);
      }
    }
  };

  return (
    <button
      className=" absolute pointer-events-auto bottom-[33%] right-6 transition-[transform,opacity,background-color] duration-150 group-hover:-translate-y-2 opacity-0 peer-focus:-translate-y-2 peer-focus:opacity-100 focus:-translate-y-2 focus:opacity-100 group-hover:opacity-100  p-2 bg-gradient-to-r from-[#AAAAAA] to-[#CCCCCC]"
      onClick={() => handlePlayClick()}
    >
      {IsPlayList ? "pause" : "play"}
    </button>
  );
}

export default DirectPlayButton;
