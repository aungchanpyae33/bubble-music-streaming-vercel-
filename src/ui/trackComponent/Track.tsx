import { TimeFormat } from "@/lib/TimeFormat";
import ToggleElement from "../Footer/audio/ToggleElement";
import { FocusElement } from "@/lib/Accessibility/FocusElement";
import ArrowNavi from "@/lib/Accessibility/ArrowNavi";
import { clsx } from "clsx";
import { RefObject } from "react";
import { urlProp } from "../albumContainer/Album";
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
      className="focus-within:bg-red-200  [&:has(:focus-visible)]:ring-4 h-fit bg-yellow-400 "
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

      <td className=" text-left   max-w-[100px] break-words truncate">
        {name}
        {sege}
      </td>

      <td className=" max-w-[100px]  truncate">aung {index}</td>
      <td className=" max-w-[100px]  ">
        <ToolTip>
          <div className="text-ellipsis overflow-x-hidden whitespace-nowrap">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, eos
            nemo exercitationem earum voluptates porro dignissimos numquam
            explicabo libero ipsam!
          </div>
        </ToolTip>
      </td>
      <td className=" text-right  max-w-[100px] truncate">
        {index}
        {TimeFormat(duration)}
      </td>
    </tr>
  );
}

export default Track;
