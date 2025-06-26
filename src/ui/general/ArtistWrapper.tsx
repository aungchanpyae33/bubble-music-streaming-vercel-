import { artists } from "@/database/data";
import UnderLineLinkHover from "./UnderLineLinkHover";

function ArtistWrapper({ artists }: { artists: artists[] }) {
  return (
    <>
      {artists.map((item, index) => (
        <UnderLineLinkHover
          key={item.id}
          href={`/artist/${item.id}`}
          prefetch={false}
          className=" mr-1   leading-relaxed w-full truncate text-start"
        >
          {item.name}
          {index < artists.length - 1 && ", "}
        </UnderLineLinkHover>
      ))}
    </>
  );
}

export default ArtistWrapper;
