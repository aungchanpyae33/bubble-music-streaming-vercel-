import { Artist } from "@/database/data";
import UnderLineLinkHover from "./UnderLineLinkHover";

function ArtistWrapper({ artists }: { artists: Artist[] }) {
  return (
    <>
      {artists.map((item, index) => (
        <span key={item.id} className="inline">
          <UnderLineLinkHover
            href={`/artist/${item.id}`}
            prefetch={false}
            className="mr-1   leading-relaxed w-full truncate text-start"
          >
            {item.name}
          </UnderLineLinkHover>
          {index < artists.length - 1 && ","}
        </span>
      ))}
    </>
  );
}

export default ArtistWrapper;
