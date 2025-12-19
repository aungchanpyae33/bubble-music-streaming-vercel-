import React, { RefObject, useContext, useEffect } from "react";
import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
// this function do close the portal when escape is pressed , it also manage the stack for inner child components
function CloseFunctoion(
  value: boolean,
  fun:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((value: boolean) => void),
  closeElement: RefObject<HTMLButtonElement | null>
) {
  const { stack, setStack } = useContext(ContextMoreOptionStack);
  // stack are 0 === parent , 1 === child , 2 === grand child etc..
  useEffect(() => {
    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape" && value === true) {
        e.preventDefault();
        // decrease the stack count because of clicking triiger
        const newStack = Math.max(0, stack - 1);
        setStack(newStack);
        // stack === 0 means it is the parent component
        // i use open (boolean) only  for parent , inner child state are paired with stack number
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
  }, [value, fun, closeElement, stack, setStack]);
}

export default CloseFunctoion;
