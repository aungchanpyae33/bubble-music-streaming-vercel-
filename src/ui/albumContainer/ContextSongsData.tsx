"use client";
import type { getSongsReturn } from "@/database/data";
import { createContext, type ReactNode, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

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
  const fetcher = async (): Promise<getSongsReturn | null> => {
    const fetchData = await fetch(`/api/playlist/${playlistId}`);
    return await fetchData.json();
  };
  const skipInitialFetch = useRef(true);
  const { data } = useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: fetcher,
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
