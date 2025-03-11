import { createContext, RefObject } from "react";
export interface prop {
  dataAudio: RefObject<HTMLAudioElement | null>;
  duration: number;
  abortController: RefObject<AbortController | null>;
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>;
  loadNextSegment: () => void;
  segNum: RefObject<number>;
  sege: number | undefined;
  bufferThreshold: number;
}

const DataContext = createContext<prop>({
  dataAudio: { current: null },
  duration: 0,
  abortController: { current: null },
  fetching: { current: { isFetch: false, fetchingseg: 1 } },
  segNum: { current: 1 },
  loadNextSegment: () => {},
  sege: undefined,
  bufferThreshold: 0,
});
export default DataContext;
