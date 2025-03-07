import MediaSessionSeek from "@/lib/MediaSession/MediaSessionSeek";
import DataContext from "@/lib/MediaSource/ContextMedia";
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
  } = useContext(DataContext);
  MediaSessionSeek(
    fetching,
    abortController,
    segNum,
    dataAudio,
    sege,
    loadNextSegment,
    duration,
    bufferThreshold
  );
  return children;
}

export default MediaSessionSeekWrapper;
