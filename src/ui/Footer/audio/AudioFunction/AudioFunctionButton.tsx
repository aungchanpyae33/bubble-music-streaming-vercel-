import { useRepeatAndCurrentPlayList } from "@/lib/zustand";
import type { urlProp } from "@/ui/albumContainer/AudiosContainer";
import { ReactNode } from "react";
import type { currentSongPlaylist } from "@/lib/zustand";
interface AudioFunctionButtonProps {
  children: (playListArray: urlProp[]) => ReactNode;
}
function AudioFunctionButton({ children }: AudioFunctionButtonProps) {
  const playListArray = useRepeatAndCurrentPlayList(
    (state: currentSongPlaylist) => Object.values(state.playListArray)[0] || []
  ) as urlProp[];

  // console.log("audiofuntionButton", playListArray);
  return children(playListArray);
}

export default AudioFunctionButton;
