import { focusState, SongState, useNotInputFocus } from "@/lib/zustand";
import { useEffect } from "react";
interface ToggleButtonSpaceKeyProps {
  setPlay: (key: string, play: boolean | undefined) => void;
  setPlayList: (key: string, play: boolean | undefined) => void;
  songCuUrl: SongState;
  playlistIdString: string;
}
function ToggleButtonSpaceKey({
  setPlay,
  setPlayList,
  songCuUrl,
  playlistIdString,
}: ToggleButtonSpaceKeyProps) {
  const isInputFocus = useNotInputFocus(
    (state: focusState) => state.isInputFocus
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isInputFocus) {
        // to prevent trigger twice when focusTrap is open
        e.stopImmediatePropagation();
        //to prevent scroll
        e.preventDefault();
        setPlay(`${songCuUrl},${playlistIdString}`, undefined);
        setPlayList(playlistIdString, undefined);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playlistIdString, setPlay, setPlayList, songCuUrl, isInputFocus]);
  return null;
}

export default ToggleButtonSpaceKey;
