import AddSonglistToQueue from "../general/optionBox/AddSonglistToQueue";
import AddToLibrary from "../general/optionBox/AddToLibrary";
import GoToArtist from "../general/optionBox/GoToArtist";
import OptionContainer from "../general/optionBox/OptionContainer";
import PlayNextQueueSongList from "../general/optionBox/PlayNextQueueSongList";
import ShareButton from "../general/optionBox/ShareButton";
import RemoveFromLibrary from "../playlist/playlistOption/RemoveFromLibrary";

function ArtistContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueueSongList />
      <AddSonglistToQueue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <GoToArtist />
      <ShareButton />
    </OptionContainer>
  );
}

export default ArtistContainerOption;
