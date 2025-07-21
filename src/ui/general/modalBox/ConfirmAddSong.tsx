"use client";
import useAddSongMutate from "@/lib/CustomHooks/AddSongMutate";
import {
  isSongExist,
  songExist,
  songExistAction,
  useIsExistSongs,
} from "@/lib/zustand";
import { useEffect } from "react";

function ConfirmAddSong() {
  const { playlistId, songId } = useIsExistSongs(
    (state: isSongExist) => state.isSongExist
  ) as songExist;
  const setIsSongExist = useIsExistSongs(
    (state: songExistAction) => state.setIsSongExist
  );
  const mutation = useAddSongMutate({ songId: songId, playlistId: playlistId });
  function handleAdd() {
    mutation.mutate();
  }
  useEffect(() => {
    if (mutation.isSuccess) {
      setIsSongExist({});
      mutation.reset();
    }
  }, [mutation, setIsSongExist]);
  return (
    <span>
      <button onClick={handleAdd}> do you want to do</button>
      <button onClick={() => setIsSongExist({})}> no exist</button>
    </span>
  );
}

export default ConfirmAddSong;
