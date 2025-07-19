import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkX } from "lucide-react";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { removeFromLibrary } from "@/actions/removeFromLibrary";

function RemoveFromLibraryChild() {
  const { setShow } = useContext(ContextMoreOption);

  const { id, source } = useContext(SongListContext) as {
    id: string;
    source: "create" | "reference";
  };
  async function removeFromLibraryFn() {
    setShow(false);
    const { error } = await removeFromLibrary(id, source);
    if (error) {
      console.log("something wrong");
    }
  }
  return (
    <OptionItem>
      <OptionButton onClick={removeFromLibraryFn}>
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
