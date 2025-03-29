import clsx from "clsx";
import React from "react";

function SearchToggleButton({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      className="sm:hidden bg-black  h-[40px] px-3"
      onMouseDown={(e) => e.preventDefault()}
      onTouchStart={(e) => e.preventDefault()}
      onClick={() => {
        setShow(!show);
      }}
    >
      {show ? "Close" : "Open"}
    </button>
  );
}

export default SearchToggleButton;
