import { listInfo, listSongsSection, SearchProfile } from "@/database/data";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import ContextSongListContainer from "../playlist/playlistOption/ContextSongListContainer";
import MoreOption from "../trackComponent/MoreOption";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import LeadingRelax from "../general/LeadingRelax";
import Image from "next/image";
import DirectPlayButton from "../playlist/DirectPlayButton";
import SearchItemWrapper from "./SearchItemWrapper";
import ContextSearchProfile from "./ContextSearchProfile";
import ProfileOption from "../general/optionBox/ProfileOption";

interface SearchProfileItemProps {
  description: string;
  index: number;
  Itemdata: SearchProfile;
}
function SearchProfileItem({
  description,
  index,
  Itemdata,
}: SearchProfileItemProps) {
  const { id, name } = Itemdata;
  return (
    <SearchItemWrapper>
      <div className="w-[50px]  relative group  ">
        <div className="size-[50px] rounded-full overflow-hidden relative">
          <Image
            src="https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
            fill
            alt="img"
            sizes="50px"
          />
        </div>
      </div>
      <div className="min-w-0 flex-1  p-2">
        <div className="truncate text-sm">
          <LeadingRelax>{name}</LeadingRelax>
        </div>
      </div>
      <div className=" flex item-center">
        <ContextSearchProfile id={id}>
          <MoreOptionContext>
            <MoreOption targetElement={<ProfileOption />} />
          </MoreOptionContext>
        </ContextSearchProfile>
      </div>
    </SearchItemWrapper>
  );
}

export default SearchProfileItem;
