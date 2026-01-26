import { DataContext } from "@/lib/MediaSource/ContextMedia";
import { RefObject, useContext, useEffect, useRef } from "react";

function getElementByDataId(
  container: HTMLElement | null,
  id: string | number,
): HTMLElement | null {
  if (!container) return null;
  return container.querySelector(`[data-id="${id}"]`) as HTMLElement | null;
}

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

function scrollContainerToElement(
  container: HTMLElement | null,
  element: HTMLElement | null,
  offset: number = 30,
  smooth: boolean = true,
) {
  if (!container || !element) return;

  container.scrollTo({
    top: element.offsetTop - offset - container.clientHeight / 3,
    behavior: smooth ? "smooth" : "auto",
  });
}
function PlaceHolderLyricScroll({
  lyricRef,
  currentIndex,
}: {
  lyricRef: RefObject<HTMLDivElement | null>;
  currentIndex: number;
}) {
  const showScroll = useRef(false);
  const { dataAudio } = useContext(DataContext);
  useEffect(() => {
    const element = getElementByDataId(lyricRef.current, currentIndex);
    if (
      !element ||
      (!isInViewport(element, lyricRef.current as HTMLElement) &&
        showScroll.current)
    )
      return;
    scrollContainerToElement(lyricRef.current, element);
    showScroll.current = true;
    return () => {
      showScroll.current = false;
    };
  }, [currentIndex, lyricRef]);

  useEffect(() => {
    const copyDataAudio = dataAudio.current;
    if (!copyDataAudio) return;
    function instantRun() {
      const element = getElementByDataId(lyricRef.current, currentIndex);
      if (!element) return;
      scrollContainerToElement(lyricRef.current, element);
    }
    copyDataAudio.addEventListener("seeked", instantRun);
    return () => {
      copyDataAudio.removeEventListener("seeked", instantRun);
    };
  }, [dataAudio, currentIndex, lyricRef]);
  return null;
}

export default PlaceHolderLyricScroll;
