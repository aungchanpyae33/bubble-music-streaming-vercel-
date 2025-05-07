import React, { RefObject, useEffect } from "react";

function OutterClick(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  parentElement: RefObject<HTMLDivElement | null>,
  ignoreRef?: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    function OutterClickFunction(e: MouseEvent | TouchEvent) {
      if (
        !parentElement!.current!.contains(e.target as Node) &&
        !ignoreRef?.current?.contains(e.target as HTMLElement)
      ) {
        fun(false);
      }
    }
    if (value) {
      document.addEventListener("mousedown", OutterClickFunction);
      document.addEventListener("touchstart", OutterClickFunction, {
        passive: true,
      });
    }

    return () => {
      // console.log("iam only run");
      document.removeEventListener("mousedown", OutterClickFunction);
      document.removeEventListener("touchstart", OutterClickFunction);
    };
  }, [value, fun, parentElement, ignoreRef]);
}

export default OutterClick;
