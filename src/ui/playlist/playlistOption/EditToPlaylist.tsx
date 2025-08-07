import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { SquarePen } from "lucide-react";

import { editToPlaylistAction, useEditToPlaylist } from "@/lib/zustand";
import { SongListContext } from "./ContextSongListContainer";

function EditToPlaylistChild() {
  const { setShow } = useContext(ContextMoreOption);
  const { id, name } = useContext(SongListContext);
  const EditToPlaylistAction = useEditToPlaylist(
    (state: editToPlaylistAction) => state.editToPlaylistAction
  );
  if (!id || !name) return null;

  function handleEdit() {
    EditToPlaylistAction({ id, name });
    setShow(false);
  }
  return (
    <OptionItem>
      <OptionButton onClick={handleEdit}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={SquarePen} />
        </OptionIconEl>
        <span>edit the playlist</span>
      </OptionButton>
    </OptionItem>
  );
}

function EditToPlaylist() {
  const { source } = useContext(SongListContext);
  if (source === "none" || source === "reference") return null;

  return <EditToPlaylistChild />;
}

export default EditToPlaylist;
