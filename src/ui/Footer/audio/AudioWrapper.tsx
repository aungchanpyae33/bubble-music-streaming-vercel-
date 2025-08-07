import {
  SongFunctionState,
  useSongFunction,
  useVolumeValue,
  VolumeValueState,
} from "@/lib/zustand";
import { RefObject, useEffect, useRef } from "react";

function AudioWrapper({
  dataAudio,
  url,
}: {
  dataAudio: RefObject<HTMLAudioElement | null>;
  url: string;
}) {
  const attchVol = useRef(false);
  const Isplay = useSongFunction(
    (state: SongFunctionState) =>
      Object.keys(state.Isplay as Record<string, boolean>)[0]
  );
  const value = useVolumeValue((state: VolumeValueState) =>
    !attchVol.current ? state.value : undefined
  );
  useEffect(() => {
    if (!attchVol.current) {
      attchVol.current = true;
    }
  }, []);

  return (
    <audio
      ref={dataAudio}
      className="hidden"
      hidden
      onLoadedMetadata={(e) => {
        if (value !== undefined) {
          const defaultVol = 1 - value / 100;
          e.currentTarget.volume = defaultVol;
        }
        Isplay && e.currentTarget.play();
      }}
    ></audio>
  );
}

export default AudioWrapper;
