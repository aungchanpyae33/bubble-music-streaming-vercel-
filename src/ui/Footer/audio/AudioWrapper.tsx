import { SongFunctionState, useSongFunction } from "@/lib/zustand";
import { RefObject } from "react";

function AudioWrapper({
  dataAudio,
  url,
}: {
  dataAudio: RefObject<HTMLAudioElement | null>;
  url: string;
}) {
  const Isplay = useSongFunction(
    (state: SongFunctionState) => state.Isplay[url || ""]
  );
  return (
    <audio
      ref={dataAudio}
      className="hidden"
      hidden
      onLoadedMetadata={(e) => Isplay && e.currentTarget.play()}
    ></audio>
  );
}

export default AudioWrapper;
