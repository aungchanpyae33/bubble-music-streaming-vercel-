// streamSupport.ts
export type StreamSupport = "mse" | "hls" | "";

let cachedSupport: StreamSupport | null = null;

export function getAudioStreamSupport(): StreamSupport {
  if (cachedSupport !== null) return cachedSupport;

  if (typeof window === "undefined" || typeof document === "undefined") {
    cachedSupport = "";
    return cachedSupport;
  }

  const MediaSourceImpl: any =
    (window as any).MediaSource || (window as any).WebKitMediaSource;
  const hasMSE =
    !!MediaSourceImpl && typeof MediaSourceImpl.isTypeSupported === "function";

  const mseAudioOk =
    hasMSE &&
    (MediaSourceImpl.isTypeSupported('audio/mp4; codecs="mp4a.40.2"') ||
      MediaSourceImpl.isTypeSupported('audio/mp4; codecs="mp4a.40.5"') ||
      MediaSourceImpl.isTypeSupported("audio/aac"));

  if (mseAudioOk) {
    cachedSupport = "mse";
    return cachedSupport;
  }

  const audio = document.createElement("audio");
  if (typeof (audio as HTMLAudioElement).canPlayType === "function") {
    const hlsSupport =
      audio.canPlayType("application/vnd.apple.mpegurl") ||
      audio.canPlayType("application/x-mpegURL") ||
      audio.canPlayType("audio/mpegurl") ||
      "";

    if (hlsSupport === "probably" || hlsSupport === "maybe") {
      cachedSupport = "hls";
      return cachedSupport;
    }
  }

  cachedSupport = "";
  return cachedSupport;
}
