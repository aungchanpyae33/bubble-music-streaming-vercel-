import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import clsx from "clsx";
import { useContext } from "react";
function AudioFull({
  footerRef,
}: {
  footerRef: React.RefObject<HTMLElement | null>;
}) {
  const { open, setopenFn } = useContext(Context);
  console.log(open);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={clsx("z-50 bg-red-500 fixed top-0 left-0 bottom-0 right-0", {
        hidden: !open,
      })}
    >
      <button
        onClick={() => {
          footerRef!.current!.classList.toggle("z-30");
          setopenFn();
        }}
      >
        close
      </button>
      <div className="">facilis necessitatibus voluptas?</div>
    </div>
  );
}

export default AudioFull;
