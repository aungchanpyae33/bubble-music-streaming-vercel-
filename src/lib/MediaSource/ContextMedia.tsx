import { Artist } from "@/database/data";
import { createContext, RefObject } from "react";
export interface prop {
  dataAudio: RefObject<HTMLAudioElement | null>;
  duration: number;
  abortController: RefObject<AbortController | null>;
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>;
  loadNextSegment: () => void;
  segNum: RefObject<number>;
  sege: number | undefined;
  song_time_stamp: Array<number>;
  bufferThreshold: number;
  song_id: string;
  is_lyric: boolean;
  name: string;
  artists: Artist[];
  cover_url: string;
}

import { ReactNode } from "react";

export const DataContext = createContext<prop>({
  dataAudio: { current: null },
  duration: 0,
  abortController: { current: null },
  fetching: { current: { isFetch: false, fetchingseg: 1 } },
  segNum: { current: 1 },
  song_time_stamp: [],
  loadNextSegment: () => {},
  sege: undefined,
  bufferThreshold: 0,
  song_id: "",
  is_lyric: false,
  name: "",
  artists: [],
  cover_url: "",
});
function ContextMedia({ children, data }: { children: ReactNode; data: prop }) {
  const value = { ...data };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default ContextMedia;
