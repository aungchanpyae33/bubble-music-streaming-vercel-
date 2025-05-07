import React, { RefObject, useEffect } from "react";
import {
  isChildOpen,
  isChildOpenAction,
  useIsChildOpenCloseFunction,
} from "./zustand";

function CloseFunctoion(
  value: boolean,
  fun:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void),
  closeElement: RefObject<HTMLButtonElement | null>,
  isChildCloseFunction: boolean
) {
  const isChildClose = isChildCloseFunction + "";
  const isChildOpen = useIsChildOpenCloseFunction(
    (state: isChildOpen) =>
      (state.isChildOpen as Record<string, boolean>)[isChildClose]
  );
  const setIsChildOpen = useIsChildOpenCloseFunction(
    (state: isChildOpenAction) => state.setIsChildOpen
  );
  useEffect(() => {
    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape" && value === true && !isChildOpen) {
        fun(false);
        setIsChildOpen({ true: false });
        closeElement.current!.focus();
      }
      if (e.key === "Tab") {
        console.log("yes");
      }
    }
    if (value) {
      window.addEventListener("keydown", closeSearch);
    }

    return () => {
      window.removeEventListener("keydown", closeSearch);
    };
  }, [value, fun, closeElement, isChildOpen, setIsChildOpen]);
}

export default CloseFunctoion;
