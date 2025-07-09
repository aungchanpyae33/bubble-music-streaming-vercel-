"use client";
import { useContext } from "react";
import { addSongsToPlaylist, useAddSongsToPlaylist } from "@/lib/zustand";
import { ContextPlaylistInfoTrack } from "./PlaylistInfoContextTrack";
import { ContextMoreOption } from "./MoreOptionContext";
function AddSongButton() {
  const { songId } = useContext(ContextPlaylistInfoTrack);

  const addSongsToPlaylist = useAddSongsToPlaylist(
    (state: addSongsToPlaylist) => state.addSongsToPlaylist
  );
  const { setShow } = useContext(ContextMoreOption);
  return (
    <div>
      <button
        onClick={() => {
          addSongsToPlaylist({ songId: songId });
          setShow(false);
        }}
        className=" h-10"
      >
        add to playlist
      </button>
    </div>
  );
}

export default AddSongButton;
