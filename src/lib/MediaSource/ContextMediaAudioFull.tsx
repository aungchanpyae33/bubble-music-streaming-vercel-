import React, { createContext, SetStateAction } from "react";
import useBodyScrollLock from "../CustomHooks/BodyScrollLock";
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
  footerRef: React.RefObject<HTMLElement | null>;
}) {
  const [open, setOpen] = useBodyScrollLock({ isCoverScroll: false });

  const value = { open, setOpen };
  console.log(open);
  return (
    <Context.Provider value={value}>
      <div
        className="flex gap-4  sm:gap-5 md:gap-6  lg:gap-10 justify-between    relative w-full h-full"
        onClick={() => {
          footerRef.current?.classList.toggle("z-50");
          setOpen(!open);
        }}
      >
        {children}
      </div>
    </Context.Provider>
  );
}

export default ContextMediaAudioFull;
