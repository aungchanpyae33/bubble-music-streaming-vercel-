"use client";
import clsx from "clsx";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import PlaceholderLyric from "./PlaceholderLyric";
import { useQuery } from "@tanstack/react-query";
import { getLyricClient } from "@/database/client-data";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
import LoadingLyric from "@/ui/loading/LoadingLyric";
import ErrorLyric from "@/ui/Error/ErrorLyric";
import NoExistLyric from "@/ui/NoExist/NoExistLyric";
import { AudioDraggingState, useAudioDragging } from "@/lib/zustand";
function getElementByDataId(
  container: HTMLElement | null,
  id: string | number
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
  smooth: boolean = true
) {
  if (!container || !element) return;

  container.scrollTo({
    top: element.offsetTop - offset - container.clientHeight / 3,
    behavior: smooth ? "smooth" : "auto",
  });
}

function scrollByValue() {}

function Lyric({
  lyricShow,
  lyricRef,
}: {
  lyricShow: boolean;
  lyricRef: RefObject<HTMLDivElement | null>;
}) {
  const { is_lyric, dataAudio } = useContext(DataContext);
  const { song_id } = useContext(DataContext);
  const isDragging = useAudioDragging(
    (state: AudioDraggingState) => state.isDragging
  );
  console.log(isDragging);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const element = getElementByDataId(lyricRef.current, currentIndex);
    if (!element || !isInViewport(element, lyricRef.current as HTMLElement))
      return;
    scrollContainerToElement(lyricRef.current, element);
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
      console.log("hello");
      copyDataAudio.removeEventListener("seeked", instantRun);
    };
  }, [dataAudio, currentIndex, lyricRef]);
  const {
    data: lyricResult,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["lyric", song_id],
    queryFn: () => getLyricClient(song_id),
    enabled: lyricShow && is_lyric,
  });
  if (!is_lyric) return <NoExistLyric />;
  if (isLoading) {
    return <LoadingLyric />;
  }
  const { data, error } = lyricResult || {};
  if (!data || error || queryError) {
    return <ErrorLyric />;
  }
  const lyric = data.lyric_data;

  return (
    <>
      {lyric && (
        <PlaceholderLyric lyric={lyric} setCurrentIndex={setCurrentIndex} />
      )}
      {lyric &&
        lyric.length > 0 &&
        lyric.map((item, idx) => (
          <p
            key={item.time}
            data-id={idx}
            className={clsx(" text-base md:text-lg", {
              "text-gray-50 font-bold": idx === currentIndex,
              "text-gray-500": idx !== currentIndex,
            })}
          >
            {item.line}
          </p>
        ))}
    </>
  );
}

export default Lyric;
