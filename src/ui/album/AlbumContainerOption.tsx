"use client";

import AddToLibrary from "../general/optionBox/AddToLibrary";
import AddToQueeue from "../general/optionBox/AddToQueeue";
import GoToArtist from "../general/optionBox/GoToArtist";
import OptionContainer from "../general/optionBox/OptionContainer";
import PlayNextQueue from "../general/optionBox/PlayNextQueue";
import ShareButton from "../general/optionBox/ShareButton";
import RemoveFromLibrary from "../playlist/playlistOption/RemoveFromLibrary";

function AlbumContainerOption() {
  return (
    <OptionContainer>
      <PlayNextQueue />
      <AddToQueeue />
      <AddToLibrary />
      <RemoveFromLibrary />
      <GoToArtist />
      <ShareButton />
    </OptionContainer>
  );
}

export default AlbumContainerOption;
