"use client";
import type { getSongsReturn } from "@/database/data";
import { createContext, type ReactNode, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistSongsApi } from "@/database/dataApi";

interface SongsDataContextType {
  songsData: getSongsReturn | null;
}

export const SongsDataContext = createContext<SongsDataContextType>({
  songsData: null,
});

function ContextSongsData({
  playlistId,
  children,
}: {
  playlistId: string;
  children: ReactNode;
}) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylistSongsApi(playlistId),
  });
  const { data, error } = queryData || {};
  if (!data || error) {
    console.error("error");
    return null;
  }

  const songsData = data[0];
  const value = { songsData };
  return (
    <SongsDataContext.Provider value={value}>
      {children}
    </SongsDataContext.Provider>
  );
}

export default ContextSongsData;
