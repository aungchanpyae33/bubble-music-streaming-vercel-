"use client";

import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { ContainerContext } from "./ContextContainer";
import ScrollLeftButton from "./ScrollLeftButton";
import ScrollRightButton from "./ScrollRightButton";
import { useScrollArrows } from "@/lib/CustomHooks/scrollArrow";
import EdgeFade from "../playlist/EdgeFade";

function PlaylistWrapper({ children }: { children: React.ReactNode }) {
  const { arrowNaviRef, playlistWrapperRef } = useContext(ContainerContext);
  const { showLeft, showRight, updateArrows, hideArrows } = useScrollArrows();
  return (
    <div
      className=" max-w-fit p-4 gap-2 md:gap-4 lg:gap-6 flex  no-scrollbar snap-x scroll-smooth   overflow-y-visible overflow-x-auto"
      ref={playlistWrapperRef}
      onScroll={updateArrows}
      onMouseEnter={updateArrows}
      onMouseLeave={hideArrows}
    >
      {showRight &&
        typeof window !== "undefined" &&
        arrowNaviRef.current &&
        createPortal(<ScrollRightButton />, arrowNaviRef!.current!)}
      {showLeft &&
        typeof window !== "undefined" &&
        arrowNaviRef.current &&
        createPortal(<ScrollLeftButton />, arrowNaviRef!.current!)}

      {children}
    </div>
  );
}

export default PlaylistWrapper;
