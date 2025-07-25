"use client";
import { createContext, ReactNode, RefObject, useRef } from "react";

interface prop {
  playlistWrapperRef: RefObject<HTMLDivElement | null>;
  arrowNaviRef: RefObject<HTMLDivElement | null>;
}

export const ContainerContext = createContext<prop>({
  playlistWrapperRef: { current: null },
  arrowNaviRef: { current: null },
});

function ContextContainer({ children }: { children: ReactNode }) {
  const playlistWrapperRef = useRef<HTMLDivElement | null>(null);
  const arrowNaviRef = useRef<HTMLDivElement | null>(null);
  const value = { playlistWrapperRef, arrowNaviRef };
  return (
    <div
      className=" max-w-full relative  pb-3"
      role="row"
      // tabIndex={0}
      // onKeyDown={(e) => {
      //   ArrowNavi(e, dataInc, "ArrowRight", "ArrowLeft", 6, "cell");
      // }}
    >
      <ContainerContext.Provider value={value}>
        {children}
      </ContainerContext.Provider>
    </div>
  );
}

export default ContextContainer;
