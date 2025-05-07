import MediaSessionSeek from "@/lib/MediaSession/MediaSessionSeek";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
import { ReactNode, useContext } from "react";

function MediaSessionSeekWrapper({
  children,
  duration,
}: {
  children: ReactNode;
  duration: number;
}) {
  const {
    dataAudio,
    loadNextSegment,
    segNum,
    sege,
    abortController,
    fetching,
    bufferThreshold,
    song_time_stamp,
  } = useContext(DataContext);
  MediaSessionSeek(
    fetching,
    abortController,
    segNum,
    dataAudio,
    sege,
    loadNextSegment,
    duration,
    bufferThreshold,
    song_time_stamp
  );
  return children;
}

export default MediaSessionSeekWrapper;
