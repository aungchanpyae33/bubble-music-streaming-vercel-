"use client";
// stack context to manage the stack number for more option and its sub more option component
import { createContext, ReactNode, SetStateAction, useState } from "react";

interface ContextMoreOptionValue {
  stack: number;
  setStack: React.Dispatch<SetStateAction<number>>;
}

interface MoreOptionStackContextProps {
  children: ReactNode;
}
export const ContextMoreOptionStack = createContext<ContextMoreOptionValue>({
  stack: 0,
  setStack: () => {},
});

function MoreOptionStackContext({ children }: MoreOptionStackContextProps) {
  const [stack, setStack] = useState(0);
  const value = { stack, setStack };

  return (
    <ContextMoreOptionStack.Provider value={value}>
      {children}
    </ContextMoreOptionStack.Provider>
  );
}

export default MoreOptionStackContext;
