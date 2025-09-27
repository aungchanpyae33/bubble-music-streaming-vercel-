import { listInfo, listSongsSection } from "@/database/data";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import ContextSongListContainer from "../playlist/playlistOption/ContextSongListContainer";
import MoreOption from "../trackComponent/MoreOption";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import LeadingRelax from "../general/LeadingRelax";
import Image from "next/image";
import DirectPlayButton from "../playlist/DirectPlayButton";
import SearchItemWrapper from "./SearchItemWrapper";
import UnderLineLinkHover from "../general/UnderLineLinkHover";

interface SearchArtistItemProps {
  description: string;
  index: number;
  Itemdata: listInfo;
}
function SearchArtistItem({
  description,
  index,
  Itemdata,
}: SearchArtistItemProps) {
  const { id, name, type, related_id, related_name, cover_url } = Itemdata;
  return (
    <SearchItemWrapper>
      <div className="w-[50px]  relative group  ">
        <div className="size-[50px] group-hover:brightness-75 relative">
          {cover_url && <Image src={cover_url} fill alt="img" sizes="50px" />}
        </div>
        <DirectPlayButton
          type={type}
          listId={id}
          className="z-10  hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        />
      </div>
      <div className="min-w-0 flex-1  p-2">
        <UnderLineLinkHover
          href={`${type}/${id}`}
          prefetch={false}
          className=" block leading-relaxed w-full truncate text-start  "
        >
          {name}
        </UnderLineLinkHover>
      </div>
      <div className=" flex items-center">
        <ContextSongListContainer
          className="w-[50px]  text-center"
          id={id}
          type={type}
          name={name}
        >
          <MoreOptionContext>
            <MoreOption targetElement={<SongListContainerOption />} />
          </MoreOptionContext>
        </ContextSongListContainer>
      </div>
    </SearchItemWrapper>
  );
}

export default SearchArtistItem;
