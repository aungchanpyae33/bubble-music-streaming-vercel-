"use client";
import { createContext, ReactNode, SetStateAction, useState } from "react";

interface ContextPlaylistInfoProps {
  songId: number;
  playlistId: string;
  source: "create" | "reference" | "none";
  isLike: boolean;
}

export const ContextPlaylistInfoTrack = createContext<ContextPlaylistInfoProps>(
  {
    songId: 0,
    playlistId: "",
    source: "none",
    isLike: false,
  }
);
function PlaylistInfoContextTrack({
  children,
  songId,
  playlistId,
  source,
  isLike,
}: {
  children: React.ReactNode;
  songId: number;
  playlistId: string;
  source: "create" | "reference" | "none";
  isLike: boolean;
}) {
  const value = { songId, playlistId, source, isLike };

  return (
    <ContextPlaylistInfoTrack.Provider value={value}>
      {children}
    </ContextPlaylistInfoTrack.Provider>
  );
}

export default PlaylistInfoContextTrack;
