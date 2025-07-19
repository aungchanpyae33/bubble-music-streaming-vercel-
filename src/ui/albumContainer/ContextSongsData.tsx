"use client";
import type { getSongsReturn } from "@/database/data";
import { createContext, type ReactNode, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/database/dataApi";

interface SongsDataContextType {
  songsData: getSongsReturn | null;
}

export const SongsDataContext = createContext<SongsDataContextType>({
  songsData: null,
});

function ContextSongsData({
  playlistId,
  children,
  songs,
}: {
  playlistId: string;
  children: ReactNode;
  songs: getSongsReturn | null;
}) {
  const skipInitialFetch = useRef(true);
  const { data } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => fetcher(playlistId),
    initialData: songs,
    staleTime: Infinity,
    enabled: !skipInitialFetch.current,
    placeholderData: songs,
  });

  const value = { songsData: data };
  useEffect(() => {
    skipInitialFetch.current = false;
  }, []);
  return (
    <SongsDataContext.Provider value={value}>
      {children}
    </SongsDataContext.Provider>
  );
}

export default ContextSongsData;
