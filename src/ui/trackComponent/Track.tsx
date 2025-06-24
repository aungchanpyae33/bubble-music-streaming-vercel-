import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import ToolTip from "../general/ToolTip";
import ToggleHeartButton from "./ToggleHeartButton";
import { artists, getSongsReturn } from "@/database/data";
import MoreOptionContext from "./MoreOptionContext";
import MoreOption from "./MoreOption";
import PlaylistInfoContext from "./PlaylistInfoContext";
import LeadingRelax from "../general/LeadingRelax";
import Link from "next/link";
import UnderLineLinkHover from "../general/UnderLineLinkHover";

function Track({
  name,
  playlistSong,
  duration,
  url,
  sege,
  index,
  like,
  songId,
  song_time_stamp,
  artists,
  albumName,
  albumId,
  uni_id,
}: // roleCell,
// dataInc,
{
  name: string;
  playlistSong: getSongsReturn | undefined;
  duration: number;
  url: string;
  sege: number;
  index: number;
  like: boolean;
  songId: number;
  song_time_stamp: Array<number>;
  artists: artists[];
  albumName: string;
  albumId: string;
  uni_id: number | undefined;
  // roleCell: RefObject<number>;
  // dataInc: RefObject<number>;
}) {
  console.log(playlistSong?.might_repeat);
  // console.log(like, playlistSong, "sdfl");
  const tooltipContent = [
    "ထားသော ကိုယ်ပိုင် ဝက်ဘ်အက်ပ် ပရောဂျက်တစ်ခုဖြစ်ပါသည်။ရိူးရှင်းပြီး အသုံးပြုရ လွယ်ကူသောဒီဇိုင်းဖြင့် ဖန်တီးထားပြီး အသုံးပြုသူ အနေဖြင့် သီချင်းနားထောင်ခြင်း ၊ သိမ်းဆည်းခြင်း အပြင် အခြားသူများဖြင့်ပါ တိုက်ရိုက်နားဆင်နိုင်ပါသည်။",
  ];
  return (
    <tr
      className=" transition-colors duration-150  [&:has(:focus-visible)]:ring-4 h-[72px]  hover:bg-[#1E2328] group focus-within:bg-[#333333]
      focus-within:hover:bg-[#333333]
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
      <td className="px-2 max-w-[10px] ">
        <ToggleElement
          url={url}
          sege={sege}
          duration={duration}
          songId={songId}
          name={name}
          might_repeat={playlistSong?.might_repeat}
          playlistSong={playlistSong}
          song_time_stamp={song_time_stamp}
          uni_id={uni_id}
          className="w-full"
        />
      </td>

      <td className=" max-w-[100px] px-2 ">
        <ToolTip tooltipContent={tooltipContent[index]}>
          <div className="text-ellipsis  overflow-x-hidden whitespace-nowrap pointer-events-none ">
            <LeadingRelax>{name}</LeadingRelax>
          </div>
        </ToolTip>
        <div className="sm:hidden">{}</div>
      </td>
      <td className=" text-left hidden px-2  sm:table-cell   max-w-[100px] break-words truncate">
        {artists.map((item) => (
          <UnderLineLinkHover
            key={item.id}
            href={`/artist/${item.id}`}
            prefetch={false}
            className=" mr-1   leading-relaxed w-full truncate text-start"
          >
            {item.name}
          </UnderLineLinkHover>
        ))}
      </td>

      <td className=" max-w-[100px] px-2  hidden md:table-cell   truncate">
        <UnderLineLinkHover
          href={`/album/${albumId}`}
          prefetch={false}
          className="  block leading-relaxed  w-fit  truncate text-start"
        >
          {albumName}
        </UnderLineLinkHover>
      </td>
      <td>
        <ToggleHeartButton like={like} songId={songId} />
      </td>
      <td className="px-2  hidden sm:table-cell   max-w-20 truncate text-center ">
        {TimeFormat(duration)}
      </td>
      <td className="w-14 text-center px-2">
        <PlaylistInfoContext
          songId={songId}
          playlistId={playlistSong!.id!}
          is_owner={playlistSong!.is_owner!}
          isLike={like}
        >
          <MoreOptionContext>
            <MoreOption />
          </MoreOptionContext>
        </PlaylistInfoContext>
      </td>
    </tr>
  );
}

export default Track;
