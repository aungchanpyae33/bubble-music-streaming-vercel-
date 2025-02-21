"use client";
import ContextMediaAudioFull from "@/lib/MediaSource/ContextMediaAudioFull";
import MediaSessionDesWrapper from "./audio/MediaSessionWrapper/MediaSessionDesWrapper";
import AudioPlayer from "./AudioPLayer";

function AudioPlayerWrapper({
  footerRef,
}: {
  footerRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <MediaSessionDesWrapper>
      <ContextMediaAudioFull footerRef={footerRef}>
        <AudioPlayer footerRef={footerRef} />
      </ContextMediaAudioFull>
    </MediaSessionDesWrapper>
  );
}

export default AudioPlayerWrapper;
