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
      className="sm:hidden  h-[40px] px-3"
      onClick={() => {
        setShow(!show);
      }}
    >
      {show ? "Close" : "Open"}
    </button>
  );
}

export default SearchToggleButton;
