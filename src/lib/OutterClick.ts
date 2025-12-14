import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";
import React, { RefObject, useContext, useEffect, useState } from "react";

function OutterClick(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  parentElement: RefObject<HTMLButtonElement | null>,
  ignoreRef: RefObject<HTMLDivElement | null>
) {
  const { setStack } = useContext(ContextMoreOptionStack);
  useEffect(() => {
    function OutterClickFunction(e: MouseEvent | TouchEvent) {
      console.log("very interesting");
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
  }, [value, fun, parentElement, ignoreRef]);
}

export default OutterClick;
