import { getDataProps, song } from "@/database/data";
import { ReactNode } from "react";
import SongListItem from "./SongListItem";

function ListItemContainer({
  songs,
}: {
  songs: getDataProps[keyof getDataProps];
}) {
  return (
    <div className="   h-full grid grid-cols-4 shrink-0 gap-4   justify-between">
      {songs.idArray.map((id) => {
        const item = songs[id] as song;
        return <SongListItem song={item} key={id} />;
      })}
    </div>
  );
}

export default ListItemContainer;
