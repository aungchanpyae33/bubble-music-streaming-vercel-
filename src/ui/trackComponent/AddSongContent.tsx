"use client";
import { playlistFolderProps, usePlaylistFolder } from "@/lib/zustand";
import AddSongItem from "./AddSongItem";
function AddSongContent() {
  const playlistFolder = usePlaylistFolder(
    (state: playlistFolderProps) => state.playlistFolder
  );

  return (
    <>
      Add songs to playlist
      {playlistFolder &&
        playlistFolder &&
        playlistFolder.map((item) => (
          <AddSongItem key={item.id} playlistSongs={item} />
        ))}
    </>
  );
}

export default AddSongContent;
