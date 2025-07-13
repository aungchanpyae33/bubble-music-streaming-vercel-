import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkX } from "lucide-react";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";

function RemoveFromLibraryChild() {
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <OptionButton
        onClick={() => {
          setShow(false);
        }}
      >
        <OptionIconEl>
          <IconWrapper size="small" Icon={BookmarkX} />
        </OptionIconEl>
        <span>Remove from library</span>
      </OptionButton>
    </OptionItem>
  );
}

function RemoveFromLibrary() {
  const { source } = useContext(SongListContext);
  if (source === "none") return null;

  return <RemoveFromLibraryChild />;
}

export default RemoveFromLibrary;
