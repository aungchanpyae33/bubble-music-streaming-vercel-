import { ContextDevice } from "@/lib/DeviceContext/DeviceContextFooter";
import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import clsx from "clsx";
import { Children, RefObject, useContext, useRef } from "react";

function AudioFooterContainer({
  children,
  footerRef,
}: {
  children: React.ReactNode;
  footerRef: RefObject<HTMLDivElement | null>;
}) {
  const initialRef = useRef<HTMLElement | null>(null);
  const { device } = useContext(ContextDevice);
  const { open, setOpen } = useContext(Context);
  return (
    // <div className="cursor-not-allowed">
    // in chrome , when use top-0 and -translate-x- that is close and bigger the parent height make a little edge between , not found in firefox , use -top parent height
    <div
      className={clsx("w-full h-full  bg-green-800", {
        "absolute -top-[70px]  left-0 overShort:static overShort:-translate-y-0 overShort:top-auto overShort:left-auto":
          device === "mobile",
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
        console.log(e.target);
        initialRef!.current! = e.target as HTMLElement;
      }}
      onClick={(e) => {
        if (e.target === initialRef.current) {
          footerRef.current?.classList.toggle("z-50");
          setOpen(!open);
        }
      }}
    >
      <div
        className={clsx(
          " w-full h-full flex gap-4 sm:gap-5 md:gap-6 bg-[#0A0A0A]  lg:gap-10 justify-between",
          {}
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default AudioFooterContainer;
