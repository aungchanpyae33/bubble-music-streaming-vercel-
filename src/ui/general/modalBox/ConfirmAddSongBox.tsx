"use client";

import { isSongExist, songExistAction, useIsExistSongs } from "@/lib/zustand";
import SubOpenContentWrapper from "@/ui/trackComponent/SubOpenContentWrapper";
import SubOptionToggle from "@/ui/trackComponent/SubOptionToggle";
import ConfirmAddSong from "./ConfirmAddSong";

function ConfirmAddSongBox() {
  return (
    <SubOpenContentWrapper
      selector={(state: isSongExist) => Object.values(state.isSongExist)[0]}
      useStore={useIsExistSongs}
    >
      <SubOptionToggle
        selector={(state: songExistAction) => state.setIsSongExist}
        useStore={useIsExistSongs}
        className=""
      >
        <ConfirmAddSong />
      </SubOptionToggle>
    </SubOpenContentWrapper>
  );
}

export default ConfirmAddSongBox;
