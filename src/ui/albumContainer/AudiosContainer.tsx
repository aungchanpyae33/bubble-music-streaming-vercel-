// "use client";
import ArrowNavi from "@/lib/Accessibility/ArrowNavi";
import Track from "../trackComponent/Track";
// import { useEffect, useRef } from "react";
import Image from "next/image";
import SongContainer from "./SongContainer";
import { Suspense } from "react";
import AlbumUpperContainer from "./AlbumUpperContainer";
import AlbumUpperBackground from "./AlbumUpperBackground";
import TableHeadBgChange from "./TableHeadBgChange";
import TableHead from "./TableHead";
// import type { currentSongPlaylistAction } from "@/lib/zustand";
// import { useCurrentPlayList } from "@/lib/zustand";
export interface urlProp {
  url: string;
  duration: number;
  sege: number;
  name: string;
}
function AudiosContainer({
  url,
  description,
}: {
  url: urlProp[];
  description: string;
}) {
  console.log("album");

  //for accessbility
  // const dataInc = useRef(0);
  // const rowCell = useRef(1);

  return (
    <div className=" bg-[rgb(43,42,43)] text-white">
      <AlbumUpperBackground>
        <Suspense>
          <AlbumUpperContainer description={description} />
        </Suspense>
      </AlbumUpperBackground>

      {/* <div
        className=""
        for accessbility
        tabIndex={0}
        onKeyDown={(e) => {
          ArrowNavi(e, dataInc, "ArrowDown", "ArrowUp", url.length, "cell");
        }}
      > */}
      <TableHeadBgChange>
        <table className=" w-full isolate">
          <TableHead>
            <tr className="text-left">
              <th className=" w-14 p-2  text-center">#</th>
              <th className="p-2">song</th>
              <th className="hidden p-2 sm:table-cell  ">artist</th>
              {/* need to use table-cell */}
              <th className=" p-2 hidden md:table-cell ">album</th>
              <th className=" p-2 hidden sm:table-cell text-right ">Time</th>
              <th className=" p-2 sm:hidden table-cell"></th>
            </tr>
          </TableHead>

          <SongContainer url={url}>
            {url.map((_, index) => (
              //need to test playlist url when click track of toggleElement
              <Track
                key={index}
                playlistUrl={url}
                name={url[index].name}
                duration={url[index].duration}
                index={index}
                //for accessbility
                // roleCell={rowCell}
                // dataInc={dataInc}
                sege={url[index].sege}
                url={url[index].url}
              />
            ))}
          </SongContainer>
        </table>
      </TableHeadBgChange>

      {/* </div> */}
    </div>
  );
}

export default AudiosContainer;
