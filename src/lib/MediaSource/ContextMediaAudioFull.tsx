import clsx from "clsx";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ContextDevice } from "../DeviceContext/DeviceContextFooter";
import Link from "next/link";
interface contextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}
export const Context = createContext<contextProps>({
  open: false,
  setOpen: () => {},
});
function ContextMediaAudioFull({
  children,
  footerRef,
}: {
  children: React.ReactNode;
  footerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [open, setOpen] = useState(false);
  const { device } = useContext(ContextDevice);
  const value = { open, setOpen };
  console.log(device);
  return (
    <Context.Provider value={value}>
      <footer
        className="w-full relative flex bg-black h-[70px]"
        ref={footerRef}
      >
        <div
          className={clsx(
            "text-white w-full h-full flex overShort:hidden justify-around items-center",
            {
              hidden: device !== "mobile",
            }
          )}
        >
          <Link href={"/setting"} className="bg-red-950 p-2">
            Search
          </Link>
          <Link href={"/setting"} className="bg-red-950 p-2">
            Library
          </Link>
          <Link href={"/setting"} className="bg-red-950 p-2">
            Genre
          </Link>
          <Link href={"/setting"} className="bg-red-950 p-2">
            Live
          </Link>
        </div>

        <div
          className={clsx(
            "flex gap-4 sm:gap-5 md:gap-6 bg-white  lg:gap-10 justify-between w-full h-fit",
            {
              "absolute top-0 -translate-y-full left-0 overShort:static overShort:-translate-y-0 overShort:top-auto overShort:left-auto":
                !open && device === "mobile",
            }
          )}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Space") {
              footerRef.current?.classList.toggle("z-50");
              setOpen(!open);
            }
          }}
          onClick={(e) => {
            footerRef.current?.classList.toggle("z-50");
            setOpen(!open);
          }}
        >
          {children}
        </div>
      </footer>
    </Context.Provider>
  );
}

export default ContextMediaAudioFull;
