"use client";
import React, { useContext } from "react";
import { addSongsToPlaylist, useAddSongsToPlaylist } from "@/lib/zustand";

import { ContextMoreOption } from "./MoreOptionContext";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";
import OptionButton from "../general/optionBox/OptionButton";
function AddSongButton({ children }: { children: React.ReactNode }) {
  const { songId } = useContext(InfoTrackContext);

  const addSongsToPlaylist = useAddSongsToPlaylist(
    (state: addSongsToPlaylist) => state.addSongsToPlaylist
  );
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <OptionButton
        onClick={() => {
          addSongsToPlaylist({ songId: songId });
          setShow(false);
        }}
      >
        {children}
      </OptionButton>
    </OptionItem>
  );
}

export default AddSongButton;
