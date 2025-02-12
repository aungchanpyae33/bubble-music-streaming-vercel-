"use client";
import { useCurrentPlayList, useSong, useSongFunction } from "@/lib/zustand";
import React from "react";
import type {
  SongDetail,
  SongState,
  SongActions,
  SongFunctionState,
  SongFunctionActions,
  currentSongPlaylistAction,
} from "@/lib/zustand";
interface toggleElementProp {
  url: string;
  sege: number;
  duration: number;
  name: string;
  playlistUrl: SongDetail[];
}
const ToggleElement = ({
  url,
  sege,
  duration,
  name,
  playlistUrl,
}: toggleElementProp) => {
  const setPlayListArray = useCurrentPlayList(
    (state: currentSongPlaylistAction) => state.setPlayListArray
  );
  const Isplay = useSongFunction(
    (state: SongFunctionState) => state.Isplay[url || ""]
  );
  const songCuUrl = useSong(
    (state: SongState) => (state.songCu as Record<string, string>)[url || ""]
  );
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
  const updateSongCu = useSong((state: SongActions) => state.updateSongCu);

  // console.log("render toggleElement");
  return (
    <td className="  p-2 border-4 border-black max-w-[10px] ">
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
          setPlayListArray(playlistUrl);
          if (url === songCuUrl) {
            setPlay(url || "", undefined);
          } else {
            updateSongCu({ [url || ""]: url, sege, duration, name });
            setPlay(url || "", true);
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
