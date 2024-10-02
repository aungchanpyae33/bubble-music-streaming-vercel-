import { useEffect } from "react";
import { SongFunction } from "../zustand";

const MediaSessionToggle = () => {
  const setPlay = SongFunction((state: any) => state.setPlay);
  const [firstKey] = SongFunction(
    (state: any) => Object.entries(state.Isplay)[0] || []
  );
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => {
        setPlay(firstKey, undefined);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        setPlay(firstKey, undefined);
      });
    }
  }, [setPlay, firstKey]);
};
export default MediaSessionToggle;
