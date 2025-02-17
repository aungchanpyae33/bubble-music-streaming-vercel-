"use client";
import MediaSessionDesWrapper from "./audio/MediaSessionWrapper/MediaSessionDesWrapper";
import AudioPlayer from "./AudioPLayer";

function AudioPlayerWrapper() {
  return (
    <MediaSessionDesWrapper>
      <AudioPlayer></AudioPlayer>
    </MediaSessionDesWrapper>
  );
}

export default AudioPlayerWrapper;
