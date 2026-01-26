import { useRepeatAndCurrentPlayList } from "@/lib/zustand";
import { ReactNode } from "react";
import type { currentSongPlaylist } from "@/lib/zustand";
import { listSongsSection } from "@/database/data";
interface AudioFunctionButtonProps {
  children: (playListArray: listSongsSection) => ReactNode;
}
function AudioFunctionButton({ children }: AudioFunctionButtonProps) {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || [],
  ) as listSongsSection;
  return children(playListArray);
}

export default AudioFunctionButton;
