import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
import React, { RefObject, useContext, useEffect } from "react";
// this function handles clicks outside the component to close it , and ignore the click inside ignoreRef and parent(trigger button) and it only used for parent component

function OutterClick(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  parentElement: RefObject<HTMLButtonElement | null>,
  ignoreRef: RefObject<HTMLDivElement | null>
) {
  // reset stack to 0 when clicked inside the parent element
  //close the component when clicked outside the parent element by checking contains method
  const { setStack } = useContext(ContextMoreOptionStack);
  useEffect(() => {
    function OutterClickFunction(e: MouseEvent | TouchEvent) {
      if (
        !parentElement!.current!.contains(e.target as Node) &&
        !ignoreRef?.current?.contains(e.target as HTMLElement)
      ) {
        fun(false);
      } else {
        setStack(0);
      }
    }
    if (value) {
      document.addEventListener("click", OutterClickFunction);
    }

    return () => {
      document.removeEventListener("click", OutterClickFunction);
    };
  }, [value, fun, parentElement, ignoreRef, setStack]);
}

export default OutterClick;
