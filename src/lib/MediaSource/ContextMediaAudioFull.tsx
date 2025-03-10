import React, { createContext, SetStateAction, useState } from "react";
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

  const value = { open, setOpen };
  // console.log(open);
  return (
    <Context.Provider value={value}>
      <footer
        className="w-full  flex bg-white  items-center  h-[70px]"
        ref={footerRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Space") {
            footerRef.current?.classList.toggle("z-50");
            setOpen(!open);
          }
        }}
        onClick={() => {
          footerRef.current?.classList.toggle("z-50");
          setOpen(!open);
        }}
      >
        <div className="flex gap-4  sm:gap-5 md:gap-6  lg:gap-10 justify-between  relative w-full h-full">
          {children}
        </div>
      </footer>
    </Context.Provider>
  );
}

export default ContextMediaAudioFull;
