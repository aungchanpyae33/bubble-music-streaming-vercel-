import { Artist } from "@/database/data";
import UnderLineLinkHover from "./UnderLineLinkHover";
import ToolTip from "./ToolTip";

function ArtistWrapper({ artists }: { artists: Artist[] }) {
  return (
    <>
      {artists.map((item, index) => (
        <ToolTip key={item.id} tooltipContent={item.name}>
          <span className="inline">
            <UnderLineLinkHover
              href={`/artist/${item.id}`}
              prefetch={false}
              className="mr-1   leading-relaxed w-full truncate text-start"
            >
              {item.name}
            </UnderLineLinkHover>
            {index < artists.length - 1 && ","}
          </span>
        </ToolTip>
      ))}
    </>
  );
}

export default ArtistWrapper;
