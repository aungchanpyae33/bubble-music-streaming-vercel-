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
  const { id, name, type, cover_url } = Itemdata;
  return (
    <SearchItemWrapper>
      <div className="w-[50px]  relative group  ">
        <div className="size-[50px] rounded-full overflow-hidden relative">
          {cover_url && <Image src={cover_url} fill alt="img" sizes="50px" />}
        </div>
      </div>
      <div className="min-w-0 flex-1  p-2">
        <div className="truncate text-sm">
          <LeadingRelax>{name}</LeadingRelax>
        </div>
      </div>
      <div className=" flex item-center">
        <ContextSongListContainer id={id} name={name} type={type} source="none">
          <MoreOptionContext>
            <MoreOption targetElement={<ProfileOption />} />
          </MoreOptionContext>
        </ContextSongListContainer>
      </div>
    </SearchItemWrapper>
  );
}

export default SearchProfileItem;
