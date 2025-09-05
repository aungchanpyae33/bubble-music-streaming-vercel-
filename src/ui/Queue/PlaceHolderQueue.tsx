import { SongState, useSong } from "@/lib/zustand";
import { RefObject, useEffect, useRef } from "react";
function isInViewport(element: HTMLElement, container: HTMLElement) {
  const elRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return (
    elRect.top < containerRect.bottom && // element's top is above container's bottom
    elRect.bottom > containerRect.top && // element's bottom is below container's top
    elRect.left < containerRect.right && // element's left is before container's right
    elRect.right > containerRect.left // element's right is after container's left
  );
}

function PlaceHolderQueue({
  queueRef,
}: {
  queueRef: RefObject<HTMLDivElement | null>;
}) {
  // scrollIntoView only in initial render
  const showScroll = useRef(false);

  const dataSongId = useSong(
    (state: SongState) => (state.songCu as Record<string, string>).id
  );
  //to make scroll to the current play when open and only track first ,not sub
  useEffect(() => {
    if (dataSongId) {
      if (!queueRef.current) return;
      const element = queueRef.current.querySelector(
        `[data-id="${dataSongId}"]`
      ) as HTMLElement | null;
      if (
        !element ||
        (!isInViewport(element, queueRef.current as HTMLElement) &&
          showScroll.current)
      )
        return;
      queueRef.current!.scrollTo({
        top: element.offsetTop - 30 - queueRef.current!.clientHeight / 3,
        behavior: "smooth",
      });
      showScroll.current = true;
    }
    return () => {
      showScroll.current = false;
    };
  }, [dataSongId, queueRef]);
  return null;
}

export default PlaceHolderQueue;
