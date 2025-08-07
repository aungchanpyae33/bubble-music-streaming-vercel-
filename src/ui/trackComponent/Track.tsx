import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import ToolTip from "../general/ToolTip";
import ToggleHeartButton from "./ToggleHeartButton";
import { listSongsSection, song } from "@/database/data";
import MoreOptionContext from "./MoreOptionContext";
import MoreOption from "./MoreOption";
import LeadingRelax from "../general/LeadingRelax";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
import ArtistWrapper from "../general/ArtistWrapper";
import TrackItemContainer from "./TrackItemContainer";
import ContextInfoTrack from "./ContextInfoTrack";

function Track({
  listSong,
  song,
  index,
}: // roleCell,
// dataInc,
{
  listSong: listSongsSection | undefined;
  song: song;
  index: number;
  // roleCell: RefObject<number>;
  // dataInc: RefObject<number>;
}) {
  // console.log(like, playlistSong, "sdfl");
  const tooltipContent = [
    "ထားသော ကိုယ်ပိုင် ဝက်ဘ်အက်ပ် ပရောဂျက်တစ်ခုဖြစ်ပါသည်။ရိူးရှင်းပြီး အသုံးပြုရ လွယ်ကူသောဒီဇိုင်းဖြင့် ဖန်တီးထားပြီး အသုံးပြုသူ အနေဖြင့် သီချင်းနားထောင်ခြင်း ၊ သိမ်းဆည်းခြင်း အပြင် အခြားသူများဖြင့်ပါ တိုက်ရိုက်နားဆင်နိုင်ပါသည်။",
  ];
  return (
    <tr
      className=" transition-colors duration-150  [&:has(:focus-visible)]:ring-4 h-[72px]  hover:bg-[#1E2328] group
      "
      // tabIndex={0}
      id="uni1"
      role={`cell${index + 1}`}
      //for accessbility
      // onKeyDown={(e) => {
      //   ArrowNavi(e, roleCell, p"ArrowRight", "ArrowLeft", 1, "rowCell");
      // }}
      // onFocus={(e) => {
      //   dataInc.current = index + 1;
      //   FocusElement(e.currentTarget, "rowCell", roleCell);
      // }}
    >
      <td className="px-2 w-[50px] ">
        <ToggleElement playlistSong={listSong} song={song} className="w-full" />
      </td>

      <td className=" max-w-[100px] px-2 ">
        <ToolTip tooltipContent={tooltipContent[index]}>
          <div className="text-ellipsis  overflow-x-hidden whitespace-nowrap pointer-events-none ">
            <LeadingRelax>{song.name}</LeadingRelax>
          </div>
        </ToolTip>
        <div className="sm:hidden">{}</div>
      </td>
      <td className=" text-left hidden px-2  sm:table-cell   max-w-[100px] break-words truncate">
        <ArtistWrapper artists={song.artists} />
      </td>

      <td className=" max-w-[100px] px-2  hidden md:table-cell   truncate">
        <UnderLineLinkHover
          href={`/album/${song.album.id}`}
          prefetch={false}
          className="  block leading-relaxed  w-fit  truncate text-start"
        >
          {song.album.name}
        </UnderLineLinkHover>
      </td>
      <td>
        <ToggleHeartButton like={song.is_liked} songId={song.song_id} />
      </td>
      <td className="px-2  hidden sm:table-cell   max-w-20 truncate text-center ">
        {TimeFormat(song.duration)}
      </td>
      <td className="w-14 text-center px-2">
        <ContextInfoTrack
          id={listSong ? listSong.id : undefined}
          source={listSong ? listSong.source : undefined}
          song={song}
        >
          <MoreOptionContext>
            <MoreOption targetElement={<TrackItemContainer />} />
          </MoreOptionContext>
        </ContextInfoTrack>
      </td>
    </tr>
  );
}

export default Track;
