import { DataContext } from "@/lib/MediaSource/ContextMedia";
import { AudioValueState, useAudioValue } from "@/lib/zustand";
import { useContext, useEffect } from "react";
// currentIndex updater placeholder that run 1s everytime from value
function PlaceholderLyric({
  lyrics,
  setCurrentIndex,
}: {
  lyrics: { time: number; line: string }[];
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { duration } = useContext(DataContext);
  const value = useAudioValue((state: AudioValueState) => state.value);
  const secReturn = value;
  const data = 100 - secReturn;
  const currentTime = (data / 100) * duration;
  const EPSILON = 0.2; // half a second tolerance

  function binarySearchLyric(
    lyrics: { time: number; line: string }[],
    currentTime: number,
    epsilon: number
  ): number {
    let left = 0;
    let right = lyrics.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const diff = lyrics[mid].time - currentTime;

      if (Math.abs(diff) < epsilon) {
        return mid; // current lyric found
      } else if (diff < 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    // if no exact match, return the closest previous lyric
    return right >= 0 ? right : 0;
  }
  useEffect(() => {
    setCurrentIndex((pre) => {
      const index = binarySearchLyric(lyrics, currentTime, EPSILON);
      if (index !== pre) {
        return index;
      }
      return pre;
    });
  }, [currentTime, lyrics, setCurrentIndex]);

  return null;
}

export default PlaceholderLyric;
