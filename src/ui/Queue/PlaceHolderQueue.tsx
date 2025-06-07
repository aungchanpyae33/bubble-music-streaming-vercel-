import { SongState, useSong } from "@/lib/zustand";
import { RefObject, useEffect, useRef } from "react";

function PlaceHolderQueue({
  queueRef,
}: {
  queueRef: RefObject<HTMLDivElement | null>;
}) {
  const showScroll = useRef(false);
  // scrollIntoView only in initial render
  const url = useSong((state: SongState) =>
    !showScroll.current
      ? Object.values(state.songCu as Record<string, string>)[0]
      : undefined
  );
  useEffect(() => {
    const element = queueRef.current?.querySelector(`[data-song-url="${url}"]`);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth" });
    showScroll.current = true;
  }, [url, queueRef]);
  return null;
}

export default PlaceHolderQueue;
