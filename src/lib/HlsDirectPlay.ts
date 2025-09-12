import { RefObject } from "react";

export const HlsDirectPlay = (
  url: string,
  audioEl: RefObject<HTMLAudioElement | null>
) => {
  //  if (canPlayHLS()) {
  if (!audioEl!.current) return;
  const m3u8Url = url.replace("init.mp4", "media.m3u8");
  audioEl.current.load();
  audioEl.current.src = m3u8Url;
  audioEl.current.onloadedmetadata = () => {
    audioEl
      .current!.play()
      .catch((err) => console.error("Playback failed:", err));
  };
  // }
};
