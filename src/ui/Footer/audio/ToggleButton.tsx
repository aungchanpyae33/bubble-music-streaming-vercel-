import MediaSessionToggle from "@/lib/MediaSession/MediaSessionToggle";
import DataContext from "@/lib/MediaSource/ContextMedia";
import { Song, SongFunction } from "@/lib/zustand";
import { useContext, useEffect } from "react";

function ToggleButton() {
  const { dataAudio } = useContext(DataContext);
  // Get the first key-value pair from Isplay
  const [firstKey, firstIsplay] = SongFunction(
    (state: any) => Object.entries(state.Isplay)[0] || []
  );

  const setPlay = SongFunction((state: any) => state.setPlay);
  // console.log("render togglebutton");
  useEffect(() => {
    function handlePlay() {
      if (dataAudio.current?.readyState) {
        if (firstIsplay) {
          dataAudio.current.play();
        } else {
          dataAudio.current.pause();
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        setPlay(firstKey, undefined);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    handlePlay();
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [firstIsplay, dataAudio, setPlay, firstKey]);
  MediaSessionToggle();
  return (
    <button
      className="w-[50px] bg-red-300"
      id="play-icon"
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        setPlay(firstKey, undefined);
        // Use the first key to toggle the state
      }}
    >{`${firstIsplay ? "pause" : "play"}`}</button>
  );
}

export default ToggleButton;
