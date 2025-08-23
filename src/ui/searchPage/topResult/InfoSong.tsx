import { SongInfo } from "@/database/data";
import ArtistWrapper from "@/ui/general/ArtistWrapper";
import UnderLineLinkHover from "@/ui/general/UnderLineLinkHover";

function InfoSong({ songInfo }: { songInfo: SongInfo }) {
  const artists = songInfo.artists;
  return (
    <>
      &bull;
      {artists.map((item, index) => (
        <span key={item.id} className="inline">
          <UnderLineLinkHover
            href={`/artist/${item.id}`}
            prefetch={false}
            className="ml-1 text-lg font-black   leading-relaxed w-full truncate text-start"
          >
            {item.name}
          </UnderLineLinkHover>
          {index < artists.length - 1 && ","}
        </span>
      ))}
    </>
  );
}

export default InfoSong;
