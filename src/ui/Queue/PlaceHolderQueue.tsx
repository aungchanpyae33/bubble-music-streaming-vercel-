import { SongState, useSong } from "@/lib/zustand";
import { RefObject, useEffect, useRef } from "react";

function PlaceHolderQueue({
  queueRef,
}: {
  queueRef: RefObject<HTMLDivElement | null>;
}) {
  const showScroll = useRef(false);
  // scrollIntoView only in initial render
  const dataSongId = useSong((state: SongState) =>
    !showScroll.current
      ? `${(state.songCu as Record<string, string>).id}`
      : undefined
  );
  //to make scroll to the current play when open and only track first ,not sub
  useEffect(() => {
    if (dataSongId) {
      const element = queueRef.current?.querySelector(
        `[data-id="${dataSongId}"]`
      );
      if (!element) return;

      element.scrollIntoView({ behavior: "smooth" });
      showScroll.current = true;
    }
  }, [dataSongId, queueRef]);
  return null;
}

export default PlaceHolderQueue;
