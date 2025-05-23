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
import IconWrapper from "../general/IconWrapper";
import { Clock } from "lucide-react";
// import type { currentSongPlaylistAction } from "@/lib/zustand";
// import { useCurrentPlayList } from "@/lib/zustand";
export interface urlProp {
  url: string;
  duration: number;
  sege: number;
  name: string;
}
export interface playlistProp {
  playlistId: string;
  song: urlProp[];
}
function AudiosContainer({
  url,
  description,
}: {
  url: playlistProp;
  description: string;
}) {
  //for accessbility
  // const dataInc = useRef(0);
  // const rowCell = useRef(1);

  return (
    <div className=" w-full">
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
              <th className="p-2">ခေါင်းစဉ်</th>
              <th className="hidden p-2 sm:table-cell  ">အဆိုတော်</th>

              <th className=" p-2 hidden md:table-cell ">အယ်လ်ဘမ်</th>
              <th className=" p-2"></th>
              <th className=" p-2 w-20 hidden sm:table-cell  text-center">
                <span className="flex justify-center">
                  <IconWrapper
                    Icon={Clock}
                    size="small"
                    className=" text-right"
                  />
                </span>
              </th>
              <th className=" p-2 sm:hidden table-cell"></th>
            </tr>
          </TableHead>

          <SongContainer url={url.song}>
            {url.song.map((_, index) => (
              //need to test playlist url when click track of toggleElement
              <Track
                key={index}
                playlistUrl={url}
                name={url.song[index].name}
                duration={url.song[index].duration}
                index={index}
                //for accessbility
                // roleCell={rowCell}
                // dataInc={dataInc}
                sege={url.song[index].sege}
                url={url.song[index].url}
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
