"use client";
import { ChevronLeft } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import ScrollHorizontal from "@/lib/ScrollHorizontal";
import { useContext } from "react";
import { ContainerContext } from "./ContextContainer";

function ScrollLeftButton() {
  const { playlistWrapperRef } = useContext(ContainerContext);
  return (
    <button onClick={() => ScrollHorizontal("left", playlistWrapperRef)}>
      <IconWrapper
        size="medium"
        className="text-white/70 bg-[#222222] hover:bg-[#333333] hover:text-white"
        Icon={ChevronLeft}
      />
    </button>
  );
}

export default ScrollLeftButton;
