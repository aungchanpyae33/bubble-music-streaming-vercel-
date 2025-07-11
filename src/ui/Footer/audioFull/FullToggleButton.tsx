import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import IconWrapper from "@/ui/general/IconWrapper";
import { Maximize } from "lucide-react";
import React, { useContext } from "react";
interface Props extends React.ComponentProps<"button"> {
  footerRef: React.RefObject<HTMLDivElement | null>;
}
function FullToggleButton({ footerRef, ref }: Props) {
  const { open, setOpen } = useContext(Context);

  return (
    <button
      ref={ref}
      className=" p-1"
      onClick={() => {
        footerRef!.current!.classList.add("z-50");
        setOpen(!open);
      }}
    >
      <IconWrapper size="small" Icon={Maximize} />
    </button>
  );
}

export default FullToggleButton;
