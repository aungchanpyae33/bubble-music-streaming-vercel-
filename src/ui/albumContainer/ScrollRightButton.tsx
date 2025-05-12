"use client";
import { useContext } from "react";
import { ContainerContext } from "./ContextContainer";
import { ChevronRight } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import ScrollHorizontal from "@/lib/ScrollHorizontal";

function ScrollRightButton() {
  const { playlistWrapperRef } = useContext(ContainerContext);
  return (
    <button onClick={() => ScrollHorizontal("right", playlistWrapperRef)}>
      <IconWrapper
        size="medium"
        className="text-white/70 bg-[#222222] hover:bg-[#333333] hover:text-white"
        Icon={ChevronRight}
      />
    </button>
  );
}

export default ScrollRightButton;
