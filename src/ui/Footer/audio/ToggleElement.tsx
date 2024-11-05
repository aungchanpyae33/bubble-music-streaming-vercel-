import { Song, SongFunction } from "@/lib/zustand";
import React from "react";
import type { SongDetail } from "@/lib/zustand";

const ToggleElement = ({ url, sege, duration, name }: SongDetail) => {
  const Isplay = SongFunction((state: any) => state.Isplay[url || ""]);
  const songCu = Song((state: any) => state.songCu[url || ""]);
  const setPlay = SongFunction((state: any) => state.setPlay);
  const updateSongCu = Song((state: any) => state.updateSongCu);

  console.log("render toggleElement");
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
          if (url === songCu) {
            setPlay(url || "", undefined);
          } else {
            updateSongCu({ [url || ""]: url, sege, duration, name });
            setPlay(url || "", true);
          }
        }}
        className="w-[50px] bg-red-300"
        id="play-icon"
      >
        <p>{url === songCu && Isplay ? "pause" : "play"}</p>
      </button>
    </>
  );
};

export default ToggleElement;
