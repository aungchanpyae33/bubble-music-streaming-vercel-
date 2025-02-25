"use client";
import ContextMediaAudioFull from "@/lib/MediaSource/ContextMediaAudioFull";
import MediaSessionDesWrapper from "./audio/MediaSessionWrapper/MediaSessionDesWrapper";
import AudioPlayer from "./AudioPLayer";
import { useRef } from "react";

function AudioPlayerWrapper() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  return (
    <MediaSessionDesWrapper>
      <ContextMediaAudioFull footerRef={footerRef}>
        <AudioPlayer footerRef={footerRef} />
      </ContextMediaAudioFull>
    </MediaSessionDesWrapper>
  );
}

export default AudioPlayerWrapper;
