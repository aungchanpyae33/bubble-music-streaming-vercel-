import { useSong, useSongFunction } from "@/lib/zustand";
import React from "react";
import type {
  SongDetail,
  SongState,
  SongActions,
  SongFunctionState,
  SongFunctionActions,
} from "@/lib/zustand";

const ToggleElement = ({ url, sege, duration, name }: SongDetail) => {
  console.log("toggle Element", name);
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
  console.log(songCuUrl);
  // console.log("render toggleElement");
  return (
    <>
      <button
        role="rowCell2"
        tabIndex={-1}
        aria-label="Play or Pause Audio"
        onKeyDown={(e) => {
          if (e.key === " " || e.code === "Space") {
            e.stopPropagation();
          }
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={() => {
          if (url === songCuUrl) {
            setPlay(url || "", undefined);
          } else {
            updateSongCu({ [url || ""]: url, sege, duration, name });
            setPlay(url || "", true);
          }
        }}
        className="w-[50px] bg-red-300"
        id="play-icon"
      >
        <p>{url === songCuUrl && Isplay ? "pause" : "play"}</p>
      </button>
    </>
  );
};

export default ToggleElement;
