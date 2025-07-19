import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkPlus } from "lucide-react";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { addToLibrary } from "@/actions/AddToLibrary";

function AddToLibraryChild() {
  const { setShow } = useContext(ContextMoreOption);
  const { id, type } = useContext(SongListContext);
  async function addToLibraryFn() {
    setShow(false);
    const { data, error } = await addToLibrary(id, type);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  }
  return (
    <OptionItem>
      <OptionButton onClick={addToLibraryFn}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={BookmarkPlus} />
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
