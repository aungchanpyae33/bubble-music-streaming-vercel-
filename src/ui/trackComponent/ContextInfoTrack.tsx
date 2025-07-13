"use client";
import { createContext, ReactNode, SetStateAction, useState } from "react";

interface InfoTrackContextProps {
  songId: string;
  id: string;
  artistId: string;
  albumId: string;
  source: "create" | "reference" | "none";
  isLike: boolean;
  uni_id: number;
}

export const InfoTrackContext = createContext<InfoTrackContextProps>({
  songId: "",
  id: "",
  artistId: "",
  albumId: "",
  source: "none",
  isLike: false,
  uni_id: 0,
});
function ContextInfoTrack({
  children,
  songId,
  id,
  artistId,
  albumId,
  source,
  isLike,
  uni_id,
}: {
  children: React.ReactNode;
  songId: string;
  id: string;
  artistId: string;
  albumId: string;
  source: "create" | "reference" | "none";
  isLike: boolean;
  uni_id: number;
}) {
  const value = { songId, id, artistId, albumId, source, isLike, uni_id };

  return (
    <InfoTrackContext.Provider value={value}>
      {children}
    </InfoTrackContext.Provider>
  );
}

export default ContextInfoTrack;
