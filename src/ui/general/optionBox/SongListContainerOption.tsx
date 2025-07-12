"use client";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import PlaylistContainerOption from "@/ui/playlist/playlistOption/PlaylistContainerOption";
import { useContext } from "react";

function SongListContainerOption() {
  const { type } = useContext(SongListContext);
  if (type === "playlist") return <PlaylistContainerOption />;
  return null;
}

export default SongListContainerOption;
