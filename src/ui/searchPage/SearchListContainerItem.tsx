import SearchItemWrapper from "./SearchItemWrapper";
import { getProps } from "@/database/data";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import ContextSongListContainer from "../playlist/playlistOption/ContextSongListContainer";
import MoreOption from "../trackComponent/MoreOption";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import LeadingRelax from "../general/LeadingRelax";
import DirectPlayButton from "../playlist/DirectPlayButton";
import Image from "next/image";
interface SearchListContainerItemProps {
  description: string;
  index: number;
  Itemdata: getProps;
}
function SearchListContainerItem({
  description,
  index,
  Itemdata,
}: SearchListContainerItemProps) {
  const { id, name, type, source, related_id, related_name } = Itemdata;
  return (
    <SearchItemWrapper>
      <div className="w-[50px]  relative group  ">
        <div className="size-[50px] group-hover:brightness-75 relative">
          <Image
            src="https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
            fill
            alt="img"
            sizes="50px"
          />
        </div>
        <DirectPlayButton
          playListId={id}
          className="z-10  hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        />
      </div>
      <div className="min-w-0 flex-1  p-2">
        <div className="truncate text-sm">
          <LeadingRelax>{name}</LeadingRelax>
        </div>
      </div>
      <div>
        <ContextSongListContainer
          className="w-[80px]"
          id={id}
          source={source}
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

export default SearchListContainerItem;
