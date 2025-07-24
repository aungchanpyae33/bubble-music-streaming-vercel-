"use client";
import type { getSongsReturn } from "@/database/data";
import { createContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaylistSongsClient } from "@/database/client-data";

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
    queryFn: () => getPlaylistSongsClient(playlistId),
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
