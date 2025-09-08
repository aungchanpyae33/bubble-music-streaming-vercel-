"use client";
import clsx from "clsx";
import { RefObject, useContext, useState } from "react";
import PlaceholderLyric from "./PlaceholderLyric";
import { useQuery } from "@tanstack/react-query";
import { getLyricClient } from "@/database/client-data";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
import LoadingLyric from "@/ui/loading/LoadingLyric";
import ErrorLyric from "@/ui/Error/ErrorLyric";
import NoExistLyric from "@/ui/NoExist/NoExistLyric";
import PlaceHolderLyricScroll from "./PlaceHolderLyricScroll";

function Lyric({
  lyricShow,
  lyricRef,
}: {
  lyricShow: boolean;
  lyricRef: RefObject<HTMLDivElement | null>;
}) {
  const { is_lyric } = useContext(DataContext);
  const { song_id } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);
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
        <>
          <PlaceholderLyric lyric={lyric} setCurrentIndex={setCurrentIndex} />
          <PlaceHolderLyricScroll
            currentIndex={currentIndex}
            lyricRef={lyricRef}
          />
        </>
      )}
      {lyric &&
        lyric.length > 0 &&
        lyric.map((item, idx) => (
          <p
            key={item.time}
            data-id={idx}
            className={clsx(" text-base md:text-lg", {
              "text-white font-bold": idx === currentIndex,
              "text-gray-400": idx !== currentIndex,
            })}
          >
            {item.line}
          </p>
        ))}
    </>
  );
}

export default Lyric;
