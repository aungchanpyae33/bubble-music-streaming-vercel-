import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import type { urlProp } from "../albumContainer/AudiosContainer";
import ToolTip from "../general/ToolTip";

function Track({
  name,
  playlistUrl,
  duration,
  url,
  sege,
  index,
}: // roleCell,
// dataInc,
{
  name: string;
  playlistUrl: urlProp[];
  duration: number;
  url: string;
  sege: number;
  index: number;
  // roleCell: RefObject<number>;
  // dataInc: RefObject<number>;
}) {
  console.log("trackelemnt", name);
  return (
    <tr
      className="focus-within:bg-red-200  [&:has(:focus-visible)]:ring-4 h-14   "
      // tabIndex={0}
      id="uni1"
      role={`cell${index + 1}`}
      //for accessbility
      // onKeyDown={(e) => {
      //   ArrowNavi(e, roleCell, "ArrowRight", "ArrowLeft", 1, "rowCell");
      // }}
      // onFocus={(e) => {
      //   dataInc.current = index + 1;
      //   FocusElement(e.currentTarget, "rowCell", roleCell);
      // }}
    >
      <ToggleElement
        url={url}
        sege={sege}
        duration={duration}
        name={name}
        // playlistUrl={playlistUrl}
      />
      <td className=" max-w-[100px] p-2">
        <ToolTip
          tooltipContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit blanditiis, amet voluptate quibusdam incidunt est illum vel ipsam nesciunt porro!"
          tooltipPosition="top"
        >
          <div className="text-ellipsis overflow-x-hidden whitespace-nowrap">
            Lorem ipsum dolo Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Impedit, molestias distinctio aspernatur repellat dolor
            tempore ducimus doloremque quibusdam velit perferendis.
          </div>
        </ToolTip>
        <div className="sm:hidden">
          {" "}
          {name}
          {sege}
        </div>
      </td>
      <td className=" text-left hidden p-2 sm:table-cell   max-w-[100px] break-words truncate">
        {name}
        {sege}
      </td>

      <td className=" max-w-[100px] p-2 hidden md:table-cell  truncate">
        aung {index}
      </td>

      <td className=" text-right p-2 hidden sm:table-cell  max-w-[100px] truncate">
        {TimeFormat(duration)}
      </td>
      <td className=" w-14 text-center p-2 sm:hidden table-cell"> dot</td>
    </tr>
  );
}

export default Track;
