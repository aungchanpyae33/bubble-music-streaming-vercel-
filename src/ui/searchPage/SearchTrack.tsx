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
  const tooltipContent = [
    "ထားသော ကိုယ်ပိုင် ဝက်ဘ်အက်ပ် ပရောဂျက်တစ်ခုဖြစ်ပါသည်။ရိူးရှင်းပြီး အသုံးပြုရ လွယ်ကူသောဒီဇိုင်းဖြင့် ဖန်တီးထားပြီး အသုံးပြုသူ အနေဖြင့် သီချင်းနားထောင်ခြင်း ၊ သိမ်းဆည်းခြင်း အပြင် အခြားသူများဖြင့်ပါ တိုက်ရိုက်နားဆင်နိုင်ပါသည်။",
  ];
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
        <ToggleElement
          playlistSong={undefined}
          song={song}
          className=" z-10  hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* Flex items have `min-width: auto` by default */}
      <div className="min-w-0 flex-1  p-2">
        <ToolTip tooltipContent={tooltipContent[index]}>
          <div className="truncate text-sm">
            <LeadingRelax>{song.name}</LeadingRelax>
          </div>
        </ToolTip>

        <div className="truncate text-sm">
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
