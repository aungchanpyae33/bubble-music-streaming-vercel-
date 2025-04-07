import MediaSessionDes from "@/lib/MediaSession/MediaSessionDescription";
import { SongDetail, SongState, useSong } from "@/lib/zustand";
import { ReactNode } from "react";

function MediaSessionDesWrapper({ children }: { children: ReactNode }) {
  const { name } = useSong((state: SongState) => state.songCu) as SongDetail;

  const url = useSong(
    (state: SongState) => Object.keys(state.songCu as Record<string, string>)[0]
  );
  MediaSessionDes(name, url);
  return children;
}

export default MediaSessionDesWrapper;
