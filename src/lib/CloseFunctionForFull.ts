import React, { RefObject, useEffect } from "react";

function CloseFunctoionForFull(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  closeElement: RefObject<HTMLElement | null>,
  refFocus: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const copyRef = refFocus!.current!;
    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape" && value === true) {
        fun(false);
        closeElement.current!.focus();
      }
      if (e.key === "Tab") {
        console.log("yes");
      }
    }
    if (value) {
      copyRef.focus();
      copyRef.addEventListener("keydown", closeSearch);
    }

    return () => {
      if (copyRef) {
        copyRef.removeEventListener("keydown", closeSearch);
      }
    };
  }, [value, fun, closeElement, refFocus]);
}

export default CloseFunctoionForFull;
