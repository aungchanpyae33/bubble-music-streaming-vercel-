"use client";
import AddSongButton from "./AddSongButton";
import RemoveSongButton from "./RemoveSongButton";
import ToggleHeartContent from "./ToggleHeartContent";
import GoToArtist from "../general/optionBox/GoToArtist";
import GoToAlbum from "../general/optionBox/GoToAlbum";
import ShareButton from "../general/optionBox/ShareButton";
import OptionContainer from "../general/optionBox/OptionContainer";
import AddToQueeue from "../general/optionBox/AddToQueeue";
import PlayNextQueue from "../general/optionBox/PlayNextQueue";

function TrackItemContainer() {
  return (
    <OptionContainer>
      <AddSongButton />
      <PlayNextQueue />
      <AddToQueeue />
      <RemoveSongButton />
      <ToggleHeartContent />
      <GoToArtist />
      <GoToAlbum />
      <ShareButton />
    </OptionContainer>
  );
}

export default TrackItemContainer;
