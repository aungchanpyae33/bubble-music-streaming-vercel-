import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import ToolTip from "../general/ToolTip";
import ToggleHeartButton from "./ToggleHeartButton";
import { listSongsSection, SongInfo } from "@/database/data";
import MoreOptionContext from "./MoreOptionContext";
import MoreOption from "./MoreOption";
import LeadingRelax from "../general/LeadingRelax";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
import ArtistWrapper from "../general/ArtistWrapper";
import TrackItemContainer from "./TrackItemContainer";
import ContextInfoTrack from "./ContextInfoTrack";
import ContextLike from "./ContextLike";
import Image from "next/image";

function Track({
  listSong,
  song,
  index,
}: // roleCell,
// dataInc,
{
  listSong: listSongsSection | undefined;
  song: SongInfo;
  index: number;
  // roleCell: RefObject<number>;
  // dataInc: RefObject<number>;
}) {
  // console.log(like, playlistSong, "sdfl");

  return (
    <tr
      className=" transition-colors duration-150  [&:has(:focus-visible)]:ring-4 h-[72px] p-3  hover:bg-[#1E2328] group
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
      <td className="w-[50px] pl-2  relative   ">
        <div className="size-[50px] group-hover:brightness-75 relative">
          {song.cover_url && (
            <Image src={song.cover_url} fill alt="img" sizes="50px" />
          )}
        </div>
        <ToggleElement
          playlistSong={listSong}
          song={song}
          className=" z-10  hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </td>

      <td className=" max-w-[200px] px-2  ">
        <ToolTip tooltipContent={song.name}>
          <div className="text-ellipsis  overflow-x-hidden whitespace-nowrap pointer-events-none ">
            <LeadingRelax>{song.name}</LeadingRelax>
          </div>
        </ToolTip>
        <div className=" flex">
          <ArtistWrapper artists={song.artists} />
        </div>
      </td>
      <td className=" max-w-[100px] px-2  hidden lg:table-cell   truncate">
        <UnderLineLinkHover
          href={`/album/${song.album.id}`}
          prefetch={false}
          className="  block leading-relaxed  w-fit  truncate text-start"
        >
          {song.album.name}
        </UnderLineLinkHover>
      </td>
      <td className="px-2   hidden sm:table-cell   max-w-20 truncate text-center ">
        {TimeFormat(song.duration)}
      </td>
      <td className="  flex  h-[72px] items-center gap-x-5 md:gap-x-8 lg:gap-x-10  justify-end">
        <ContextInfoTrack
          id={listSong ? listSong.id : undefined}
          source={listSong ? listSong.source : undefined}
          song={song}
        >
          <ContextLike id={song.song_id} like={song.is_liked}>
            <ToggleHeartButton songId={song.song_id} />
            <MoreOptionContext>
              <MoreOption targetElement={<TrackItemContainer />} />
            </MoreOptionContext>
          </ContextLike>
        </ContextInfoTrack>
      </td>
    </tr>
  );
}

export default Track;
