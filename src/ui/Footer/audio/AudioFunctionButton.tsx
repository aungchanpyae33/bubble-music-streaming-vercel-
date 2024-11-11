import MediaSessionButton from "@/lib/MediaSession/MediaSessionButton";
import { useCurrentPlayList } from "@/lib/zustand";
import { urlProp } from "@/ui/albumContainer/Album";
import { ReactNode } from "react";
import type { currentSongPlaylist } from "@/lib/zustand";
interface AudioFunctionButtonProps {
  children: (playListArray: urlProp[]) => ReactNode;
}
function AudioFunctionButton({ children }: AudioFunctionButtonProps) {
  const playListArray = useCurrentPlayList(
    (state: currentSongPlaylist) => state.playListArray
  ) as urlProp[];
  console.log("audiofuntionButton", playListArray);
  return children(playListArray);
}

export default AudioFunctionButton;
