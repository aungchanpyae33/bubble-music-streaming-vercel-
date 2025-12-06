"use client";
import { createContext, ReactNode, SetStateAction, useState } from "react";
import ContextGoToRelative, {
  GoToRelativeContextValue,
} from "../general/optionBox/ContextGoToRelative";

interface ContextMoreOptionValue {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

interface MoreOptionContextProps {
  children: ReactNode;
  relative: GoToRelativeContextValue["relative"];
}
export const ContextMoreOption = createContext<ContextMoreOptionValue>({
  show: false,
  setShow: () => {},
});

function MoreOptionContext({ children, relative }: MoreOptionContextProps) {
  const [show, setShow] = useState(false);
  const value = { show, setShow };

  return (
    <ContextMoreOption.Provider value={value}>
      <ContextGoToRelative relative={relative}>{children}</ContextGoToRelative>
    </ContextMoreOption.Provider>
  );
}

export default MoreOptionContext;
