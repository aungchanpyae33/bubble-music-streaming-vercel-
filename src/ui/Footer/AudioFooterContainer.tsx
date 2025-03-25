import { ContextDevice } from "@/lib/DeviceContext/DeviceContextFooter";
import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import clsx from "clsx";
import { Children, RefObject, useContext, useRef } from "react";

function AudioFooterContainer({
  children,
  footerRef,
  url,
}: {
  children: React.ReactNode;
  footerRef: RefObject<HTMLElement | null>;
  url: string;
}) {
  const initialRef = useRef<HTMLElement | null>(null);
  const { device } = useContext(ContextDevice);
  const { open, setOpen } = useContext(Context);
  return (
    // <div className="cursor-not-allowed">
    <div
      className={clsx("w-full h-[70px]", {
        "absolute top-0 -translate-y-full left-0 overShort:static overShort:-translate-y-0 overShort:top-auto overShort:left-auto":
          !open && device === "mobile",
        " cursor-not-allowed": !url,
      })}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          footerRef.current?.classList.toggle("z-50");
          setOpen(!open);
        }
      }}
      // to track initial click elemet , without this  check , if user click the button then hold and release the container that does not have e.stopP will trigger the parent onClick ,
      onMouseDown={(e) => {
        if (!url) return;
        console.log(e.target);
        initialRef!.current! = e.target as HTMLElement;
      }}
      onClick={(e) => {
        if (!url) return;
        if (e.target === initialRef.current) {
          footerRef.current?.classList.toggle("z-50");
          setOpen(!open);
        }
      }}
    >
      <div
        className={clsx(
          " w-full h-full flex gap-4 sm:gap-5 md:gap-6 bg-white  lg:gap-10 justify-between",
          {
            " pointer-events-none": !url,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default AudioFooterContainer;
