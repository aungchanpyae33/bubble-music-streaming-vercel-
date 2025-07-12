"use client";
import useAddSongMutate from "@/lib/CustomHooks/AddSongMutate";
import {
  isSongExist,
  songExist,
  songExistAction,
  useIsExistSongs,
} from "@/lib/zustand";
import { useEffect } from "react";
import { createPortal } from "react-dom";

function ConfirmAddSongsChild() {
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
    <div>
      {playlistId &&
        songId &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed z-50 inset-0 bg-black/50"
            onClick={() => setIsSongExist({})}
          >
            <div
              className=" z-50 bg-zinc-800 p-3 rounded-md border border-zinc-500 w-[400px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleAdd}> do you want to do</button>
              <button onClick={() => setIsSongExist({})}> no exist</button>
            </div>
          </div>,

          document.body
        )}
    </div>
  );
}
function ConfirmAddSongs() {
  const { playlistId, songId } = useIsExistSongs(
    (state: isSongExist) => state.isSongExist
  ) as songExist;
  if (!playlistId || !songId) return null;
  return <ConfirmAddSongsChild />;
}

export default ConfirmAddSongs;
