"use client";
import {
  useDirectPlayBack,
  usePreviousPlayList,
  useRepeatAndCurrentPlayList,
  useSong,
  useSongFunction,
} from "@/lib/zustand";
import React from "react";
import type {
  SongDetail,
  SongState,
  SongActions,
  SongFunctionState,
  SongFunctionActions,
  currentSongPlaylistAction,
  previousSongPlaylistAction,
  DirectPlayBackAction,
} from "@/lib/zustand";
import { playlistProp } from "@/ui/albumContainer/AudiosContainer";
interface toggleElementProp {
  url: string;
  sege: number;
  duration: number;
  name: string;
  playlistUrl: playlistProp;
}
const ToggleElement = ({
  url,
  sege,
  duration,
  name,
  playlistUrl,
}: toggleElementProp) => {
  const uniUrl = `${url},${playlistUrl.playlistId}`;
  const setPlayListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );
  const Isplay = useSongFunction(
    (state: SongFunctionState) => state.Isplay[uniUrl || ""]
  );
  const songCuUrl = useSong(
    (state: SongState) => (state.songCu as Record<string, string>)[url || ""]
  );
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);
  const setPreviousPlayListArray = usePreviousPlayList(
    (state: previousSongPlaylistAction) => state.setPreviousPlayListArray
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );

  console.log(uniUrl);
  // console.log("render toggleElement");
  return (
    <td className="  px-2 max-w-[10px] ">
      <button
        role="rowCell1"
        // tabIndex={-1}
        aria-label="Play or Pause Audio"
        onKeyDown={(e) => {
          if (e.key === " " || e.code === "Space") {
            e.stopPropagation();
          }
        }}
        // onMouseDown={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        // }}
        onClick={() => {
          setPlayListArray(playlistUrl.song);
          setPreviousPlayListArray(playlistUrl.song);
          if (url === songCuUrl) {
            setPlay(uniUrl || "", undefined);
          } else {
            updateSongCu({ [url || ""]: url, sege, duration, name });
            setPlayList(playlistUrl.playlistId || "", true);
            setPlay(uniUrl || "", true);
          }
        }}
        className="w-full "
        id="play-icon"
      >
        <span className=" flex justify-center">
          {url === songCuUrl && Isplay ? "pause" : "play"}
        </span>
      </button>
    </td>
  );
};

export default ToggleElement;
