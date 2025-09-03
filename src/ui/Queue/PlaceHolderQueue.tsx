import { SongState, useSong } from "@/lib/zustand";
import { RefObject, useEffect, useRef } from "react";

function PlaceHolderQueue({
  queueRef,
  show,
}: {
  queueRef: RefObject<HTMLDivElement | null>;
  show: boolean;
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
    if (dataSongId && show) {
      const element = queueRef.current?.querySelector(
        `[data-id="${dataSongId}"]`
      ) as HTMLElement | null;
      if (!element) return;
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
        showScroll.current = true;
      }, 300);
    }
  }, [dataSongId, queueRef, show]);
  return null;
}

export default PlaceHolderQueue;
