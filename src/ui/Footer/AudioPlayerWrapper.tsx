"use client";
import ContextMediaAudioFull from "@/lib/MediaSource/ContextMediaAudioFull";
import MediaSessionDesWrapper from "./audio/MediaSessionWrapper/MediaSessionDesWrapper";
import AudioPlayer from "./AudioPLayer";
import React, { useRef } from "react";

function AudioPlayerWrapper({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  return (
    <MediaSessionDesWrapper>
      <ContextMediaAudioFull footerRef={footerRef} footerNaviRef={children}>
        <AudioPlayer footerRef={footerRef} />
      </ContextMediaAudioFull>
    </MediaSessionDesWrapper>
  );
}

export default AudioPlayerWrapper;
