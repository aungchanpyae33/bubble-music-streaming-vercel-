import OptionContainer from "@/ui/general/optionBox/OptionContainer";
import AddToLibrary from "@/ui/general/optionBox/AddToLibrary";
import RemoveFromLibrary from "./RemoveFromLibrary";
import EditToPlaylist from "./EditToPlaylist";
import PlayNextQueueSongList from "@/ui/general/optionBox/PlayNextQueueSongList";
import AddSonglistToQueue from "@/ui/general/optionBox/AddSonglistToQueue";
import ShareList from "@/ui/general/shareButton/ShareList";

function PlaylistContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueueSongList />
      <AddSonglistToQueue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <EditToPlaylist />
      <ShareList />
    </OptionContainer>
  );
}

export default PlaylistContainerOption;
