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
  const value = { open, setOpen };

  return (
    <Context.Provider value={value}>
      <div className="w-full relative flex  h-[70px]" ref={footerRef}>
        {footerNaviRef}
        {children}
      </div>
    </Context.Provider>
  );
}

export default ContextMediaAudioFull;
