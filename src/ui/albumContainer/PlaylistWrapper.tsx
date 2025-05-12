"use client";
import { useContext } from "react";
import { ContainerContext } from "./ContextContainer";

function PlaylistWrapper({ children }: { children: React.ReactNode }) {
  const { playlistWrapperRef } = useContext(ContainerContext);
  return (
    <div
      className=" max-w-fit p-4    gap-2 md:gap-4 lg:gap-6 flex  no-scrollbar snap-x scroll-smooth   overflow-y-visible overflow-x-auto"
      ref={playlistWrapperRef}
    >
      {children}
    </div>
  );
}

export default PlaylistWrapper;
