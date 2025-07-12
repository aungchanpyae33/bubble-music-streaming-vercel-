import { ListPlus, ListStart, ListX, OptionIcon } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import AddSongButton from "./AddSongButton";

import RemoveSongButton from "./RemoveSongButton";
import ToggleHeartContent from "./ToggleHeartContent";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import GoToArtist from "../general/optionBox/GoToArtist";
import GoToAlbum from "../general/optionBox/GoToAlbum";
import ShareButton from "../general/optionBox/ShareButton";
import OptionContainer from "../general/optionBox/OptionContainer";
import AddToQueeue from "../general/optionBox/AddToQueeue";

function TrackItemContainer() {
  return (
    <OptionContainer>
      <AddSongButton>
        <OptionIconEl>
          <IconWrapper size="medium" Icon={ListPlus} />
        </OptionIconEl>
        <span>Add to the playlist</span>
      </AddSongButton>
      <AddToQueeue
        iconEl={
          <OptionIconEl>
            <IconWrapper size="medium" Icon={ListStart} />
          </OptionIconEl>
        }
      />
      <RemoveSongButton>
        <OptionIconEl>
          <IconWrapper size="medium" Icon={ListX} />
        </OptionIconEl>

        <span>remove </span>
      </RemoveSongButton>

      <ToggleHeartContent />

      <GoToArtist />
      <GoToAlbum />
      <ShareButton />
    </OptionContainer>
  );
}

export default TrackItemContainer;
