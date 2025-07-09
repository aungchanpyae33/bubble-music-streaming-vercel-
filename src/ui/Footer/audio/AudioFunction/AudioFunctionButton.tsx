import { useRepeatAndCurrentPlayList } from "@/lib/zustand";
import { ReactNode } from "react";
import type { currentSongPlaylist } from "@/lib/zustand";
import { getSongsReturn } from "@/database/data";
interface AudioFunctionButtonProps {
  children: (playListArray: getSongsReturn) => ReactNode;
}
function AudioFunctionButton({ children }: AudioFunctionButtonProps) {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as getSongsReturn;

  return children(playListArray);
}

export default AudioFunctionButton;
