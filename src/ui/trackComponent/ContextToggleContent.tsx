"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ContextMoreOption } from "./MoreOptionContext";

interface contextProps {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
}
export const ToggleContentContext = createContext<contextProps>({
  hidden: false,
  setHidden: () => {},
});

function ContextToggleContent({ children }: { children: React.ReactNode }) {
  const { show } = useContext(ContextMoreOption);
  const [hidden, setHidden] = useState(show);
  const value = { hidden, setHidden };
  return (
    <ToggleContentContext.Provider value={value}>
      {children}
    </ToggleContentContext.Provider>
  );
}

export default ContextToggleContent;
