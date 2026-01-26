"use client";
import React, { useContext } from "react";
import { addSongsToPlaylist, useAddSongsToPlaylist } from "@/lib/zustand";

import { ContextMoreOption } from "./MoreOptionContext";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";
import OptionButton from "../general/optionBox/OptionButton";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import { ListPlus } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
function AddSongButton() {
  const { song } = useContext(InfoTrackContext);
  const songId = song?.song_id;
  const cover_url = song?.cover_url;
  const addSongsToPlaylist = useAddSongsToPlaylist(
    (state: addSongsToPlaylist) => state.addSongsToPlaylist,
  );
  const { setShow } = useContext(ContextMoreOption);
  if (!songId) return null;

  return (
    <OptionItem>
      <OptionButton
        onClick={() => {
          addSongsToPlaylist({ songId, cover_url });
          setShow(false);
        }}
      >
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListPlus} />
        </OptionIconEl>
        <span>Add to the playlist</span>
      </OptionButton>
    </OptionItem>
  );
}

export default AddSongButton;
