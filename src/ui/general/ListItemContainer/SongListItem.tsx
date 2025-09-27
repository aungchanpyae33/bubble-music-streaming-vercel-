import ToggleElement from "@/ui/Footer/audio/Toggle/ToggleElement";
import Image from "next/image";
import LeadingRelax from "../LeadingRelax";
import ArtistWrapper from "../ArtistWrapper";
import ToggleHeartButton from "@/ui/trackComponent/ToggleHeartButton";
import ContextInfoTrack from "@/ui/trackComponent/ContextInfoTrack";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
import TrackItemContainer from "@/ui/trackComponent/TrackItemContainer";
import MoreOption from "@/ui/trackComponent/MoreOption";
import { SongInfo } from "@/database/data";
import ContextLike from "@/ui/trackComponent/ContextLike";

function SongListItem({ song }: { song: SongInfo }) {
  return (
    <div className="h-[60px] w-[300px] rounded-sm outline outline-slate-200   flex items-center  gap-3">
      <div className="w-[50px] pl-2 group  ">
        <div className="size-[50px] group-hover:brightness-75 relative">
          {song.cover_url && (
            <Image src={song.cover_url} fill alt="img" sizes="50px" />
          )}
          <ToggleElement
            playlistSong={undefined}
            song={song}
            className=" z-10  hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      {/* Flex items have `min-width: auto` by default */}
      <div className="min-w-0 flex-1  p-2">
        {/* <ToolTip tooltipContent={tooltipContent[index]}> */}
        <div className="truncate text-sm">
          <LeadingRelax>{song.name}</LeadingRelax>
        </div>
        {/* </ToolTip> */}

        <div className="truncate text-sm">
          <ArtistWrapper artists={song.artists} />
        </div>
      </div>
      <div className=" w-fit max-w-fit">
        <ContextLike id={song.song_id}>
          <ToggleHeartButton songId={song.song_id} />
        </ContextLike>
      </div>
      <div className=" w-[80px]  text-center px-2">
        <ContextInfoTrack id={undefined} source={undefined} song={song}>
          <ContextLike id={song.song_id}>
            <MoreOptionContext>
              <MoreOption targetElement={<TrackItemContainer />} />
            </MoreOptionContext>
          </ContextLike>
        </ContextInfoTrack>
      </div>
    </div>
  );
}

export default SongListItem;
