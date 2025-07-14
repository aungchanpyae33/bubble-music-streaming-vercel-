"use client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSongsFromPlaylist } from "@/actions/removeSongsFromPlaylist";
import { ContextMoreOption } from "./MoreOptionContext";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";
import OptionButton from "../general/optionBox/OptionButton";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import IconWrapper from "../general/IconWrapper";
import { ListX } from "lucide-react";

function RemoveSongButtonChild() {
  const queryClient = useQueryClient();
  const { setShow } = useContext(ContextMoreOption);
  const { id, song } = useContext(InfoTrackContext);
  const songId = song?.id;
  const uni_id = song?.uni_id!;
  const mutation = useMutation({
    mutationFn: async () => await removeSongsFromPlaylist(id, songId!, uni_id),
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
      <OptionButton onClick={handleRemove}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListX} />
        </OptionIconEl>

        <span>remove from playlist </span>
      </OptionButton>
    </OptionItem>
  );
}

function RemoveSongButton() {
  const { source } = useContext(InfoTrackContext);
  if (source !== "create") return null;
  return <RemoveSongButtonChild />;
}

export default RemoveSongButton;
