import OptionContainer from "@/ui/general/optionBox/OptionContainer";
import ShareButton from "@/ui/general/optionBox/ShareButton";
import AddToLibrary from "@/ui/general/optionBox/AddToLibrary";
import RemoveFromLibrary from "./RemoveFromLibrary";
import EditToPlaylist from "./EditToPlaylist";
import PlayNextQueueSongList from "@/ui/general/optionBox/PlayNextQueueSongList";
import AddSSonglistToQueue from "@/ui/general/optionBox/AddSSonglistToQueue";

function PlaylistContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueueSongList />
      <AddSSonglistToQueue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <EditToPlaylist />
      <ShareButton />
    </OptionContainer>
  );
}

export default PlaylistContainerOption;
