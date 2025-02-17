import React, { RefObject, useEffect } from "react";

function CloseFunctoion(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  closeElement: RefObject<HTMLButtonElement | null>
) {
  useEffect(() => {
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
      window.addEventListener("keydown", closeSearch);
    }

    return () => {
      window.removeEventListener("keydown", closeSearch);
    };
  }, [value, fun, closeElement]);
}

export default CloseFunctoion;
