import { useEffect } from "react";
import { useSongFunction } from "../zustand";

const MediaSessionToggle = () => {
  const setPlay = useSongFunction((state: any) => state.setPlay);
  const [firstKey] = useSongFunction(
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
