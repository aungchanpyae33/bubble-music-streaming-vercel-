import OptionContainer from "@/ui/general/optionBox/OptionContainer";
import ShareButton from "@/ui/general/optionBox/ShareButton";
import AddToLibrary from "@/ui/general/optionBox/AddToLibrary";
import RemoveFromLibrary from "./RemoveFromLibrary";
import EditToPlaylist from "./EditToPlaylist";
import PlayNextQueueSongList from "@/ui/general/optionBox/PlayNextQueueSongList";
import AddSonglistToQueue from "@/ui/general/optionBox/AddSonglistToQueue";

function PlaylistContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueueSongList />
      <AddSonglistToQueue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <EditToPlaylist />
      <ShareButton />
    </OptionContainer>
  );
}

export default PlaylistContainerOption;
