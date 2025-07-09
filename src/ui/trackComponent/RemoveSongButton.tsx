"use client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSongsFromPlaylist } from "@/actions/removeSongsFromPlaylist";
import { ContextPlaylistInfoTrack } from "./PlaylistInfoContextTrack";
import { ContextMoreOption } from "./MoreOptionContext";

function RemoveSongButton() {
  const queryClient = useQueryClient();
  const { setShow } = useContext(ContextMoreOption);
  const { songId, playlistId, source } = useContext(ContextPlaylistInfoTrack);

  const mutation = useMutation({
    mutationFn: async () => await removeSongsFromPlaylist(playlistId, songId!),
    onSuccess: (returnData, variables, context) => {
      const { data, error } = returnData;
      if (!data || error) return;
      const mutatedData = data[0];
      if (!error) {
        queryClient.setQueryData(["playlist", playlistId], mutatedData);
      }
      setShow(false);
    },
  });
  if (source !== "create") return null;
  const handleRemove = () => {
    mutation.mutate();
  };

  return (
    <div>
      <button onClick={handleRemove} className="h-10">
        remove from playlist
      </button>
    </div>
  );
}

export default RemoveSongButton;
