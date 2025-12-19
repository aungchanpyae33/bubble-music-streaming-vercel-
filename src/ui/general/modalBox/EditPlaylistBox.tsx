"use client";

import {
  editToPlaylist,
  editToPlaylistAction,
  useEditToPlaylist,
} from "@/lib/zustand";
import SubOpenContentWrapper from "@/ui/trackComponent/SubOpenContentWrapper";
import SubOptionToggle from "@/ui/trackComponent/SubOptionToggle";

import EditContentBox from "./EditContentBox";

function EditPlaylistBox() {
  return (
    <SubOpenContentWrapper
      selector={(state: editToPlaylist) =>
        Object.values(state.editToPlaylist)[0]
      }
      useStore={useEditToPlaylist}
    >
      <SubOptionToggle
        selector={(state: editToPlaylistAction) => state.editToPlaylistAction}
        useStore={useEditToPlaylist}
        className="max-w-[480px] w-[94%]"
      >
        <EditContentBox />
      </SubOptionToggle>
    </SubOpenContentWrapper>
  );
}

export default EditPlaylistBox;
