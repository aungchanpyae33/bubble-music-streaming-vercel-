"use client";
import AddSongButton from "./AddSongButton";
import RemoveSongButton from "./RemoveSongButton";
import ToggleHeartContent from "./ToggleHeartContent";
import GoToArtist from "../general/optionBox/GoToArtist";
import GoToAlbum from "../general/optionBox/GoToAlbum";
import ShareButton from "../general/optionBox/ShareButton";
import OptionContainer from "../general/optionBox/OptionContainer";

import PlayNextQueue from "../general/optionBox/PlayNextQueue";
import AddToQueue from "../general/optionBox/AddToQueeue";

function TrackItemContainer() {
  return (
    <OptionContainer>
      <AddSongButton />
      <PlayNextQueue />
      <AddToQueue />
      <RemoveSongButton />
      <ToggleHeartContent />
      <GoToArtist />
      <GoToAlbum />
      <ShareButton />
    </OptionContainer>
  );
}

export default TrackItemContainer;
