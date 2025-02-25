import React, { RefObject, useEffect } from "react";

function CloseFunctoionForFull(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  closeElement: RefObject<HTMLElement | null>,
  refFocus: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    function closeSearch(e: KeyboardEvent) {
      if (e.key === "Escape" && value === true) {
        console.log("hi");
        fun(false);
        closeElement!.current!.classList.toggle("z-50");
        closeElement.current!.focus();
      }
      if (e.key === "Tab") {
        console.log("yes");
      }
    }
    if (value) {
      refFocus!.current!.focus();
      window.addEventListener("keydown", closeSearch);
    }

    return () => {
      window.removeEventListener("keydown", closeSearch);
    };
  }, [value, fun, closeElement, refFocus]);
}

export default CloseFunctoionForFull;
