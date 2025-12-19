import { RefObject } from "react";

export const HlsDirectPlay = (
  url: string,
  audioElRef: RefObject<HTMLAudioElement | null>
) => {
  if (!audioElRef!.current) return;
  const m3u8Url = url.replace("init.mp4", "media.m3u8");
  audioElRef.current.load();
  audioElRef.current.src = m3u8Url;
  audioElRef.current.onloadedmetadata = () => {
    audioElRef
      .current!.play()
      .catch((err) => console.error("Playback failed:", err));
  };
};
