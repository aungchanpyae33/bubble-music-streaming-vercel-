"use client";
import { createContext, ReactNode, SetStateAction, useState } from "react";

interface ContextMoreOptionProps {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

export const ContextMoreOption = createContext<ContextMoreOptionProps>({
  show: false,
  setShow: () => {},
});
function MoreOptionContext({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const value = { show, setShow };

  return (
    <ContextMoreOption.Provider value={value}>
      {children}
    </ContextMoreOption.Provider>
  );
}

export default MoreOptionContext;
