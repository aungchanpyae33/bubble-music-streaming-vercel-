import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkX } from "lucide-react";
import { removeFromLibrary } from "@/actions/removeFromLibrary";
import { SongListContext, SongListValue } from "./ContextSongListContainer";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function RemoveFromLibraryChild() {
  const { setShow } = useContext(ContextMoreOption);

  const router = useRouter();
  const { id, source } = useContext(SongListContext) as SongListValue;
  const queryClient = useQueryClient();
  async function removeFromLibraryFn() {
    setShow(false);
    const { data, error } = await removeFromLibrary(
      id,
      source as "create" | "reference",
    );

    if (error) {
      console.log("something wrong", error);
    } else {
      if (data) {
        queryClient.setQueryData(["user-library"], {
          data,
          error: null,
        });
        if (source === "create") {
          router.push("/");
        }
      }
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
  const { source } = useContext(SongListContext) as SongListValue;
  if (source === "none") return null;
  return <RemoveFromLibraryChild />;
}

export default RemoveFromLibrary;
