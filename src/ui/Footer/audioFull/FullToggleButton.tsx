import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import { useContext } from "react";
function FullToggleButton({
  footerRef,
}: {
  footerRef: React.RefObject<HTMLElement | null>;
}) {
  const { open, setOpen } = useContext(Context);
  console.log(open);
  return (
    <>
      <button
        className="bg-black text-white p-1 hidden md:inline-block"
        onClick={() => {
          footerRef!.current!.classList.toggle("z-50");
          setOpen(!open);
        }}
      >
        open
      </button>
    </>
  );
}

export default FullToggleButton;
