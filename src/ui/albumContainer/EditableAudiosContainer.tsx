import SongContainer from "./SongContainer";
import TableHeadBgChange from "./TableHeadBgChange";
import TableHead from "./TableHead";
import IconWrapper from "../general/IconWrapper";
import { Clock } from "lucide-react";
import { getSongsReturn } from "@/database/data";
import ContextSongsData from "./ContextSongsData";
import ConRenderSong from "./ConRenderSong";
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
function EditableAudiosContainer({
  playlistId,
  playlistSong,
  description,
}: {
  playlistId: string;
  playlistSong: getSongsReturn | null;
  description: string;
}) {
  //for accessbility
  // const dataInc = useRef(0);
  // const rowCell = useRef(1);
  return (
    <ContextSongsData playlistId={playlistId}>
      <ConRenderSong
        container={
          <TableHeadBgChange>
            <table className="w-full isolate">
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
                  <th className=" p-2"></th>
                </tr>
              </TableHead>

              <SongContainer />
            </table>
          </TableHeadBgChange>
        }
        empty={<div> oops there is a empty </div>}
      />
    </ContextSongsData>
  );
}

export default EditableAudiosContainer;
