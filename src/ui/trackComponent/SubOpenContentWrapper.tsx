import {
  addSongsToPlaylistProps,
  songsToPlaylist,
  useAddSongsToPlaylist,
} from "@/lib/zustand";
import { createPortal } from "react-dom";

function SubOpenContentWrapper({ children }: { children: React.ReactNode }) {
  const { songId } = useAddSongsToPlaylist(
    (state: songsToPlaylist) => state.songsToPlaylist
  ) as addSongsToPlaylistProps;
  return (
    songId &&
    typeof window !== "undefined" &&
    createPortal(children, document.body)
  );
}

export default SubOpenContentWrapper;
