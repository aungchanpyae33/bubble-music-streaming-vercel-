import React, { RefObject, useContext, useEffect } from "react";
import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";

function CloseFunctoion(
  value: boolean,
  fun:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void),
  closeElement: RefObject<HTMLButtonElement | null>
) {
  const { stack, setStack } = useContext(ContextMoreOptionStack);
  useEffect(() => {
    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape" && value === true) {
        const newStack = Math.max(0, stack - 1);
        setStack(newStack);
        if (stack === 0) {
          fun(false);
          closeElement.current!.focus();
        }
      }
    }
    if (value) {
      window.addEventListener("keydown", closeSearch);
    }

    return () => {
      window.removeEventListener("keydown", closeSearch);
    };
  }, [value, fun, closeElement, stack]);
}

export default CloseFunctoion;
