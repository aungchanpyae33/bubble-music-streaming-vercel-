import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import type { playlistProp, urlProp } from "../albumContainer/AudiosContainer";
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
  playlistUrl: playlistProp;
  duration: number;
  url: string;
  sege: number;
  index: number;
  // roleCell: RefObject<number>;
  // dataInc: RefObject<number>;
}) {
  return (
    <tr
      className="focus-within:bg-red-200  [&:has(:focus-visible)]:ring-4 h-[72px]  hover:bg-[#333333]"
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
        playlistUrl={playlistUrl}
      />
      <td className=" max-w-[100px] px-2 ">
        <ToolTip
          tooltipContent="Lorem df Lorem ipsum dolo Lorem ipsum dolor sit amet Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Alias a consectetur voluptatem
            atque totam nostrum eos culpa minus quia!"
        >
          <div className="text-ellipsis  overflow-x-hidden whitespace-nowrap pointer-events-none">
            Lorem ipsum dolo Lorem ipsum dolor sit amet Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Alias a consectetur voluptatem
            atque totam nostrum eos culpa minus quia!
          </div>
        </ToolTip>
        <div className="sm:hidden">
          {" "}
          {name}
          {sege}
        </div>
      </td>
      <td className=" text-left hidden px-2  sm:table-cell   max-w-[100px] break-words truncate">
        {name}
        {sege}
      </td>

      <td className=" max-w-[100px] px-2  hidden md:table-cell  truncate">
        aung {index}
      </td>

      <td className=" text-right px-2  hidden sm:table-cell  max-w-[100px] truncate">
        {TimeFormat(duration)}
      </td>

      <td className=" w-14 text-center px-2  sm:hidden table-cell"> dot</td>
    </tr>
  );
}

export default Track;
