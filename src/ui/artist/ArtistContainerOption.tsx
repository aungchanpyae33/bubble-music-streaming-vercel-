import AddSonglistToQueue from "../general/optionBox/AddSonglistToQueue";
import AddToLibrary from "../general/optionBox/AddToLibrary";
import GoToArtist from "../general/optionBox/GoToArtist";
import OptionContainer from "../general/optionBox/OptionContainer";
import PlayNextQueueSongList from "../general/optionBox/PlayNextQueueSongList";
import ShareList from "../general/shareButton/ShareList";
import RemoveFromLibrary from "../playlist/playlistOption/RemoveFromLibrary";

function ArtistContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueueSongList />
      <AddSonglistToQueue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <GoToArtist />
      <ShareList />
    </OptionContainer>
  );
}

export default ArtistContainerOption;
