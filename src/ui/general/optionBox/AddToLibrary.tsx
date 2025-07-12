import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkPlus } from "lucide-react";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";

function AddToLibraryChild() {
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <OptionButton
        onClick={() => {
          setShow(false);
        }}
      >
        <OptionIconEl>
          <IconWrapper size="medium" Icon={BookmarkPlus} />
        </OptionIconEl>
        <span>Add to the library</span>
      </OptionButton>
    </OptionItem>
  );
}

function AddToLibrary() {
  const { source } = useContext(SongListContext);
  if (source !== "none") return null;

  return <AddToLibraryChild />;
}

export default AddToLibrary;
