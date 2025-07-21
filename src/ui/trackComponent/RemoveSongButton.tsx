"use client";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";
import OptionButton from "../general/optionBox/OptionButton";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import IconWrapper from "../general/IconWrapper";
import { ListX } from "lucide-react";
import useRemoveSongMutate from "@/lib/CustomHooks/mutation/RemoveSongMutate";

function RemoveSongButtonChild() {
  const { id, song } = useContext(InfoTrackContext);
  const songId = song?.id;
  const uni_id = song?.uni_id!;
  const mutation = useRemoveSongMutate(id);
  const handleRemove = () => {
    mutation.mutate({
      playlistId: id,
      songId: songId!,
      uni_id: uni_id!,
    });
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
