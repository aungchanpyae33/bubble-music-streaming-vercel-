"use client";
import useAddSongMutate from "@/lib/CustomHooks/mutation/AddSongMutate";
import {
  addSongsToPlaylistProps,
  isSongExist,
  songExist,
  songExistAction,
  songsToPlaylist,
  useAddSongsToPlaylist,
  useIsExistSongs,
} from "@/lib/zustand";
import { useEffect } from "react";

function ConfirmAddSong() {
  const { playlistId, songId } = useIsExistSongs(
    (state: isSongExist) => state.isSongExist
  ) as songExist;
  const { cover_url } = useAddSongsToPlaylist(
    (state: songsToPlaylist) => state.songsToPlaylist
  ) as addSongsToPlaylistProps;
  const setIsSongExist = useIsExistSongs(
    (state: songExistAction) => state.setIsSongExist
  );
  const mutation = useAddSongMutate(playlistId, cover_url);
  function handleAdd() {
    mutation.mutate({
      playlistId,
      songId,
    });
  }
  useEffect(() => {
    if (mutation.isSuccess) {
      setIsSongExist({});
      mutation.reset();
    }
  }, [mutation, setIsSongExist]);
  return (
    <span>
      <button onClick={handleAdd}>
        {" "}
        songs is already exist! do you want to add?
      </button>
      <button onClick={() => setIsSongExist({})}> do not add</button>
    </span>
  );
}

export default ConfirmAddSong;
