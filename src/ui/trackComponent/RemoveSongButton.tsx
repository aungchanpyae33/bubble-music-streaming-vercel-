"use client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSongsFromPlaylist } from "@/actions/removeSongsFromPlaylist";
import { ContextMoreOption } from "./MoreOptionContext";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";

function RemoveSongButtonChild({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const { setShow } = useContext(ContextMoreOption);
  const { songId, id } = useContext(InfoTrackContext);
  // console.log(playlistId, "rel");
  const mutation = useMutation({
    mutationFn: async () => await removeSongsFromPlaylist(id, songId!),
    onSuccess: (returnData, variables, context) => {
      const { data, error } = returnData;
      if (!data || error) return;
      const mutatedData = data[0];
      if (!error) {
        queryClient.setQueryData(["playlist", id], mutatedData);
      }
      setShow(false);
    },
  });

  const handleRemove = () => {
    mutation.mutate();
  };

  return (
    <OptionItem>
      <button onClick={handleRemove} className="flex items-center">
        {children}
      </button>
    </OptionItem>
  );
}

function RemoveSongButton({ children }: { children: React.ReactNode }) {
  const { source } = useContext(InfoTrackContext);
  if (source !== "create") return null;
  return <RemoveSongButtonChild>{children}</RemoveSongButtonChild>;
}

export default RemoveSongButton;
