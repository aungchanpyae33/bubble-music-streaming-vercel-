"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import { useState } from "react";

function ToggleHeartButton() {
  const [isLike, setIsLike] = useState(false);
  //  with initil undefind or null then use coming from prop
  return (
    <button
      className=" group-hover:visible invisible"
      onClick={() => setIsLike(!isLike)}
    >
      <IconWrapper
        Icon={Heart}
        size="small"
        className={clsx("", {
          "fill-white": isLike,
        })}
      />
    </button>
  );
}

export default ToggleHeartButton;
