"use client";
import {
  SongFunctionState,
  useSongFunction,
  useVolumeValue,
  VolumeValueState,
} from "@/lib/zustand";
import React, { createContext, ReactNode, useEffect, useRef } from "react";

interface AudioElementContextProps {
  audioEl: React.RefObject<HTMLAudioElement | null>;
}
export const AudioElementContext = createContext<AudioElementContextProps>({
  audioEl: {
    current: null,
  },
});

function AudioWrapper({ children }: { children: ReactNode }) {
  const attchVol = useRef(false);
  const Isplay = useSongFunction(
    (state: SongFunctionState) =>
      Object.values(state.Isplay as Record<string, boolean>)[0],
  );
  const value = useVolumeValue((state: VolumeValueState) =>
    !attchVol.current ? state.value : undefined,
  );
  useEffect(() => {
    if (!attchVol.current) {
      attchVol.current = true;
    }
  }, []);

  const audioEl = useRef<HTMLAudioElement>(null);
  return (
    <>
      <audio
        ref={audioEl}
        onLoadedMetadata={(e) => {
          if (value !== undefined) {
            const defaultVol = 1 - value / 100;
            e.currentTarget.volume = defaultVol;
          }
          if (Isplay) {
            e.currentTarget.play();
          }
        }}
      />
      <AudioElementContext.Provider value={{ audioEl }}>
        {children}
      </AudioElementContext.Provider>
    </>
  );
}

export default AudioWrapper;
