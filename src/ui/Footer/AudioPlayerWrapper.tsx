"use client";
import ContextMediaAudioFull from "@/lib/MediaSource/ContextMediaAudioFull";
import AudioPlayer from "./AudioPLayer";
import React, { useRef } from "react";

function AudioPlayerWrapper({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  return (
    <ContextMediaAudioFull footerNaviRef={children}>
      <AudioPlayer footerRef={footerRef} />
    </ContextMediaAudioFull>
  );
}

export default AudioPlayerWrapper;
