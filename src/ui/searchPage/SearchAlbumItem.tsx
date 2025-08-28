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
import { outputRelatedType } from "@/lib/prototypeOuputRelatedType";

interface SearchAlbumItemProps {
  description: string;
  index: number;
  Itemdata: listInfo;
}
function SearchAlbumItem({
  description,
  index,
  Itemdata,
}: SearchAlbumItemProps) {
  const { id, name, type, source, related_id, related_name } = Itemdata;
  const relatedType = outputRelatedType(type);
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
        {relatedType && (
          <UnderLineLinkHover
            href={`${relatedType}/${related_id}`}
            prefetch={false}
            className=" block leading-relaxed w-full truncate text-start text-sm text-zinc-400 "
          >
            {related_name}
          </UnderLineLinkHover>
        )}
      </div>

      <div className=" flex items-center">
        <ContextSongListContainer
          className="w-[50px]  text-center"
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

export default SearchAlbumItem;
