"use client";
import { getProps } from "@/database/data";
import { createContext, ReactNode } from "react";

interface SongListContextProps {
  id: getProps["id"];
  source: getProps["source"];
  type: getProps["type"];
}

// Default context value
export const SongListContext = createContext<SongListContextProps>({
  id: "",
  source: "none",
  type: "album", //for default data(forced) no meaningful
});

function ContextSongListContainer({
  children,
  id,
  source,
  type,
}: {
  children: ReactNode;
  id: getProps["id"];
  source: getProps["source"];
  type: getProps["type"];
}) {
  const value = { id, source, type };

  return (
    <SongListContext.Provider value={value}>
      <span
        className=" absolute top-2 right-2 has-hover:opacity-0 has-hover:group-hover:opacity-100 has-hover:transition-opacity has-hover:duration-150"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {children}
      </span>
    </SongListContext.Provider>
  );
}

export default ContextSongListContainer;
