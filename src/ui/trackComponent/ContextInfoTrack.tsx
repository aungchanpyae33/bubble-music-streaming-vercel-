"use client";

import { getUserLibClient } from "@/database/client-data";
import { navbarList, SongInfo } from "@/database/data";
import { useQuery } from "@tanstack/react-query";
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

function getSourceType(
  userLib: Record<string, navbarList> & {
    idArray: string[];
  },
  source: "create" | "reference" | "none" | undefined,
  id: string | undefined
) {
  if (source) {
    const { source } = userLib[id || ""] ?? { source: "none" };
    return source;
  }
  return source;
}
// same system design with isPage case , in this case source is behave like isPage check in contextSonglistContainer
function ContextInfoTrack({
  children,
  id,
  source,
  song,
}: {
  children: React.ReactNode;
  id: string | undefined;
  source?: "create" | "reference" | "none";
  song: SongInfo | undefined;
}) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (!queryData || queryError) return;
  const { data, error } = queryData || {};
  if (!data || error) return;
  const { userLib } = data;
  const sourceType = getSourceType(userLib, source, id);
  const value = { id, song, source: sourceType };
  return (
    <InfoTrackContext.Provider value={value}>
      {children}
    </InfoTrackContext.Provider>
  );
}

export default ContextInfoTrack;
