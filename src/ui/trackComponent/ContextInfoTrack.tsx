"use client";
import { createContext, ReactNode, SetStateAction, useState } from "react";

interface InfoTrackContextProps {
  songId: number;
  id: string;
  artistId: string;
  albumId: string;
  source: "create" | "reference" | "none";
  isLike: boolean;
}

export const InfoTrackContext = createContext<InfoTrackContextProps>({
  songId: 0,
  id: "",
  artistId: "",
  albumId: "",
  source: "none",
  isLike: false,
});
function ContextInfoTrack({
  children,
  songId,
  id,
  artistId,
  albumId,
  source,
  isLike,
}: {
  children: React.ReactNode;
  songId: number;
  id: string;
  artistId: string;
  albumId: string;
  source: "create" | "reference" | "none";
  isLike: boolean;
}) {
  const value = { songId, id, artistId, albumId, source, isLike };

  return (
    <InfoTrackContext.Provider value={value}>
      {children}
    </InfoTrackContext.Provider>
  );
}

export default ContextInfoTrack;
