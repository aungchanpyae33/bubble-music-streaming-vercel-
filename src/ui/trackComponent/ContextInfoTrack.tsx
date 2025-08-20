"use client";

import { SongInfo } from "@/database/data";
import { createContext } from "react";

interface songContext {
  song: SongInfo | undefined;
}

interface InfoTrackContextProps extends songContext {
  id?: string;
  source?: "create" | "reference" | "none";
}

export const InfoTrackContext = createContext<InfoTrackContextProps>({
  id: "",
  source: "none",
  song: undefined,
});
function ContextInfoTrack({
  children,
  id,
  source,
  song,
}: {
  children: React.ReactNode;
  id?: string;
  source?: "create" | "reference" | "none";
  song: SongInfo | undefined;
}) {
  const value = { id, source, song };

  return (
    <InfoTrackContext.Provider value={value}>
      {children}
    </InfoTrackContext.Provider>
  );
}

export default ContextInfoTrack;
