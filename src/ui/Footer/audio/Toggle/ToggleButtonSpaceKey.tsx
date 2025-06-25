import {
  DirectPlayBackAction,
  focusState,
  SongFunctionActions,
  SongState,
  useDirectPlayBack,
  useNotInputFocus,
  useSongFunction,
} from "@/lib/zustand";
import { useEffect } from "react";
function ToggleButtonSpaceKey() {
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList
  );
  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay
  );
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
        setPlay("unknown", undefined);
        setPlayList("unknown", undefined);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setPlay, setPlayList, isInputFocus]);
  return null;
}

export default ToggleButtonSpaceKey;
