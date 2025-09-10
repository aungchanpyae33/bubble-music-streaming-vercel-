import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import ToolTip from "../general/ToolTip";
import LeadingRelax from "../general/LeadingRelax";
import ArtistWrapper from "../general/ArtistWrapper";
import ToggleHeartButton from "../trackComponent/ToggleHeartButton";
import ContextInfoTrack from "../trackComponent/ContextInfoTrack";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import TrackItemContainer from "../trackComponent/TrackItemContainer";
import Image from "next/image";
import SearchItemWrapper from "./SearchItemWrapper";
import { SongInfo } from "@/database/data";
import ContextLike from "../trackComponent/ContextLike";

function SearchTrack({
  song,
  index,
}: // roleCell,
// dataInc,
{
  song: SongInfo;
  index: number;
  // roleCell: RefObject<number>;
  // dataInc: RefObject<number>;
}) {
  return (
    <SearchItemWrapper>
      <div className="w-[50px]  relative group  ">
        <div className="size-[50px] group-hover:brightness-75 relative">
          {song.cover_url && (
            <Image src={song.cover_url} fill alt="img" sizes="50px" />
          )}
        </div>
        <ToggleElement
          playlistSong={undefined}
          song={song}
          className=" z-10  hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* Flex items have `min-width: auto` by default */}
      <div className="min-w-0 flex-1  p-2">
        <ToolTip tooltipContent={song.name}>
          <div className="truncate text-sm">
            <LeadingRelax>{song.name}</LeadingRelax>
          </div>
        </ToolTip>

        <div className="truncate text-sm flex">
          <ArtistWrapper artists={song.artists} />
        </div>
      </div>

      <div className=" flex items-center   text-center gap-x-5 md:gap-x-8 lg:gap-x-10 ">
        <ContextInfoTrack id={undefined} source={undefined} song={song}>
          <ContextLike like={song.is_liked} id={song.song_id}>
            <ToggleHeartButton songId={song.song_id} />
            <MoreOptionContext>
              <MoreOption targetElement={<TrackItemContainer />} />
            </MoreOptionContext>
          </ContextLike>
        </ContextInfoTrack>
      </div>
    </SearchItemWrapper>
  );
}

export default SearchTrack;
