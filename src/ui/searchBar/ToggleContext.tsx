"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
interface contextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const ContextToggle = createContext<contextProps>({
  open: false,
  setOpen: () => {},
});
function ToggleContext({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };
  return (
    <ContextToggle.Provider value={value}>{children}</ContextToggle.Provider>
  );
}

export default ToggleContext;
