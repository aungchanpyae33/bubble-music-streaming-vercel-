import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/Toggle/ToggleElement";
import type { playlistProp, urlProp } from "../albumContainer/AudiosContainer";
import ToolTip from "../general/ToolTip";
import IconWrapper from "../general/IconWrapper";
import { EllipsisVertical } from "lucide-react";
import ToggleHeartButton from "./ToggleHeartButton";

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
  const tooltipContent = [
    "dfdkjbf jkbfibdfiub uidf",
    "fdisgiruwr",
    "dfldfkiweri w ieweeiu wiu i wuehwieurg uig wiuer iugr wiugr g iuwirhwr wrg iwug iwr fh iuh igug ishd ishg wht9w hu highs ih sidgh weihetwiuhwuerewirhw ihr iwhr iwhriwhrwiehr wbriwehrwiurh h iewri hwirh wirhweiur wuh",
    " ewjroiwj rwe",
    "w erweroih  wier woierh wer ",
    "dfknoiwnroiwhw e",
  ];
  return (
    <tr
      className=" transition-colors duration-150  [&:has(:focus-visible)]:ring-4 h-[72px]  hover:bg-[#1E2328] group focus-within:bg-[#333333]
      focus-within:hover:bg-[#333333]
      "
      // tabIndex={0}
      id="uni1"
      role={`cell${index + 1}`}
      //for accessbility
      // onKeyDown={(e) => {
      //   ArrowNavi(e, roleCell, p"ArrowRight", "ArrowLeft", 1, "rowCell");
      // }}
      // onFocus={(e) => {
      //   dataInc.current = index + 1;
      //   FocusElement(e.currentTarget, "rowCell", roleCell);
      // }}
    >
      <td className="px-2 max-w-[10px] ">
        <ToggleElement
          url={url}
          sege={sege}
          duration={duration}
          name={name}
          playlistUrl={playlistUrl}
          className="w-full"
        />
      </td>

      <td className=" max-w-[100px] px-2 ">
        <ToolTip tooltipContent={tooltipContent[index]}>
          <div className="text-ellipsis  overflow-x-hidden whitespace-nowrap pointer-events-none">
            Lorem ipsum dolo Lorem ipsum
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
      <td>
        <ToggleHeartButton />
      </td>
      <td className="px-2  hidden sm:table-cell   max-w-20 truncate text-center">
        {TimeFormat(duration)}
      </td>

      <td className=" w-14 text-center px-2  sm:hidden table-cell">
        <IconWrapper Icon={EllipsisVertical} size="small" />
      </td>
    </tr>
  );
}

export default Track;
