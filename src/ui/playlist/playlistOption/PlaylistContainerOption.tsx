import AddToQueeue from "@/ui/general/optionBox/AddToQueeue";
import OptionContainer from "@/ui/general/optionBox/OptionContainer";
import ShareButton from "@/ui/general/optionBox/ShareButton";
import AddToLibrary from "@/ui/general/optionBox/AddToLibrary";
import RemoveFromLibrary from "./RemoveFromLibrary";
import EditToPlaylist from "./EditToPlaylist";
import PlayNextQueue from "@/ui/general/optionBox/PlayNextQueue";

function PlaylistContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueue />
      <AddToQueeue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <EditToPlaylist />
      <ShareButton />
    </OptionContainer>
  );
}

export default PlaylistContainerOption;
