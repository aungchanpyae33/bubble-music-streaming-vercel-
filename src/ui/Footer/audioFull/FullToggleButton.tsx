import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import IconWrapper from "@/ui/general/IconWrapper";
import { Maximize2 } from "lucide-react";
import React, { useContext } from "react";
interface Props extends React.ComponentProps<"button"> {
  footerRef: React.RefObject<HTMLDivElement | null>;
}
function FullToggleButton({ footerRef, ref }: Props) {
  const { open, setOpen } = useContext(Context);
  // console.log(open);
  return (
    <button
      ref={ref}
      className=" p-1"
      onClick={() => {
        footerRef!.current!.classList.toggle("z-50");
        setOpen(!open);
      }}
    >
      <IconWrapper size="small" Icon={Maximize2} />
    </button>
  );
}

export default FullToggleButton;
