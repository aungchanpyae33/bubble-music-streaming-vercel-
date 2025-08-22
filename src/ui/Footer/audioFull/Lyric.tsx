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

function Lyric({
  lyricShow,
  lyricRef,
}: {
  lyricShow: boolean;
  lyricRef: RefObject<HTMLDivElement | null>;
}) {
  const { is_lyric } = useContext(DataContext);
  const { song_id } = useContext(DataContext);
  console.log(is_lyric);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const element = lyricRef.current?.querySelector(
      `[data-id="${currentIndex}"]`
    ) as HTMLElement | null;
    if (!element) return;
    lyricRef.current!.scrollTo({
      top: element.offsetTop - 30 - lyricRef.current!.clientHeight / 3,
      behavior: "smooth",
    });
  }, [currentIndex, lyricRef]);

  const {
    data: lyricResult,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["lyric", song_id],
    staleTime: 0,
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
            className={clsx("", {
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
