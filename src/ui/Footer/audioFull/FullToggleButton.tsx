import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import React, { useContext } from "react";
interface Props extends React.ComponentProps<"button"> {
  footerRef: React.RefObject<HTMLElement | null>;
}
function FullToggleButton({ footerRef, ref }: Props) {
  const { open, setOpen } = useContext(Context);
  // console.log(open);
  return (
    <button
      ref={ref}
      className="bg-black  text-white p-1"
      onClick={() => {
        footerRef!.current!.classList.toggle("z-50");
        setOpen(!open);
      }}
    >
      open
    </button>
  );
}

export default FullToggleButton;
