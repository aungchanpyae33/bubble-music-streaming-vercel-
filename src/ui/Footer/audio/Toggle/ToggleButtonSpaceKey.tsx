import {
  focusState,
  SongFunctionActions,
  SongState,
  StorePlayListIdState,
  useNotInputFocus,
} from "@/lib/zustand";
import { useEffect } from "react";
interface ToggleButtonSpaceKeyProps {
  setPlay: (key: string, play: boolean | undefined) => void;
  setPlayList: (key: string, play: boolean | undefined) => void;
  songCuUrl: SongState;
  playlistIdString: string;
  children: React.ReactNode;
}
function ToggleButtonSpaceKey({
  setPlay,
  setPlayList,
  songCuUrl,
  playlistIdString,
  children,
}: ToggleButtonSpaceKeyProps) {
  const isInputFocus = useNotInputFocus(
    (state: focusState) => state.isInputFocus
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isInputFocus) {
        // to prevent scroll
        e.preventDefault();
        setPlay(`${songCuUrl},${playlistIdString}`, undefined);
        setPlayList(playlistIdString, undefined);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playlistIdString, setPlay, setPlayList, songCuUrl, isInputFocus]);
  return children;
}

export default ToggleButtonSpaceKey;
