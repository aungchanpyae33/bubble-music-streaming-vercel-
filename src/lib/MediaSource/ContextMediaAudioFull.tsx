import clsx from "clsx";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { ContextDevice } from "../DeviceContext/DeviceContextFooter";
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
  footerNaviRef,
}: {
  children: React.ReactNode;
  footerRef: React.RefObject<HTMLDivElement | null>;
  footerNaviRef: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { device } = useContext(ContextDevice);
  const value = { open, setOpen };
  const initialRef = useRef<HTMLElement | null>(null);
  return (
    <Context.Provider value={value}>
      <footer
        className="w-full relative flex bg-black h-[70px]"
        ref={footerRef}
      >
        {footerNaviRef}

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
          {children}
        </div>
      </footer>
    </Context.Provider>
  );
}

export default ContextMediaAudioFull;
