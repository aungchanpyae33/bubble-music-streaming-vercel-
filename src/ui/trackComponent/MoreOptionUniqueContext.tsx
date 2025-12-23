"use client";
// uuid context store for unique option button
import { createContext, ReactNode, SetStateAction, useState } from "react";

interface ContextMoreOptionValue {
  uuidState: string;
  setUuidState: React.Dispatch<SetStateAction<string>>;
}

interface MoreOptionUniqueContextProps {
  children: ReactNode;
}
export const ContextMoreOptionUnique = createContext<ContextMoreOptionValue>({
  uuidState: "",
  setUuidState: () => {},
});

function MoreOptionUniqueContext({ children }: MoreOptionUniqueContextProps) {
  const [uuidState, setUuidState] = useState("");
  const value = { uuidState, setUuidState };

  return (
    <ContextMoreOptionUnique.Provider value={value}>
      {children}
    </ContextMoreOptionUnique.Provider>
  );
}

export default MoreOptionUniqueContext;
