import AddToQueue from "../general/optionBox/AddToQueeue";
import GoToAlbum from "../general/optionBox/GoToAlbum";
import GoToArtist from "../general/optionBox/GoToArtist";
import OptionContainer from "../general/optionBox/OptionContainer";
import PlayNextQueue from "../general/optionBox/PlayNextQueue";
import ShareSong from "../general/shareButton/ShareSong";
import AddSongButton from "../trackComponent/AddSongButton";
import ToggleHeartContent from "../trackComponent/ToggleHeartContent";
import RemoveFromQueue from "./RemoveFromQueue";

function QueueItemContainer() {
  return (
    <OptionContainer>
      <AddSongButton />
      <PlayNextQueue />
      <AddToQueue />
      <RemoveFromQueue />
      <ToggleHeartContent />
      <GoToArtist />
      <GoToAlbum />
      <ShareSong />
    </OptionContainer>
  );
}

export default QueueItemContainer;
