"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import PlaceholderLyric from "./PlaceholderLyric";

function Lyric({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lyricRef = useRef<HTMLDivElement>(null);
  //test data for now
  const lyrics = [
    { time: 0, line: "" },
    { time: 20.25, line: "오늘 밤은 이 분위기에 취해 (취해)" },
    { time: 24.39, line: "아무런 생각 없이 groove it, mmm (mmm)" },
    { time: 28.64, line: "고민하지 마, just do it (do it)" },
    { time: 32.73, line: "Move your body like that" },
    { time: 34.35, line: "비틀거리면 어때, I like that, yeah" },
    { time: 36.81, line: "Let me blow your mind (blow your mind)" },
    {
      time: 39.09,
      line: "지루한 사람들 속, 넌 마치 Friday night (Friday night)",
    },
    { time: 43.77, line: "So take my hand, 내 맘을 흔들어봐" },
    { time: 46.63, line: "빨간 립스틱, 진하게 바르고" },
    { time: 50.34, line: "So dance, dance, dance" },
    { time: 52.33, line: "Keep on dance, dance, dance, people" },
    { time: 55.51, line: "빨간 립스틱, 너 때문에 번져도" },
    { time: 59.29, line: "Just dance, dance, dance (yeah)" },
    { time: 61.42, line: "Keep on dance, dance, dance, people" },
    { time: 64.04, line: "나와 나만의 baby boo, 사랑은 forever" },
    {
      time: 66.48,
      line: "누구도 방해할 수 없지, stop it? They could never (yeah)",
    },
    { time: 68.85, line: "But never mind that, 지금 rewind that" },
    { time: 70.93, line: "이 노래처럼 다시 한 번 더 play back" },
    { time: 73.32, line: "Spin me round and round, 몸을 up and down" },
    { time: 75.89, line: "이 밤이 지나가기 전에, do it right now" },
    { time: 77.99, line: "이 분위기 그대로, turn the music up" },
    {
      time: 80.1,
      line: "'Cause the party ain't a party 'til we all turned off",
    },
    { time: 81.53, line: "Gonna lose your mind" },
    { time: 83.87, line: "꺼지지 않는 불빛 속에 서울의 밤" },
    { time: 88.67, line: "So take my hand, 네 몸을 흔들어봐" },
    { time: 91.4, line: "빨간 립스틱, 진하게 바르고" },
    { time: 95.13, line: "So dance, dance, dance" },
    { time: 97.28, line: "Keep dance, dance, dance, people" },
    { time: 100.18, line: "빨간 립스틱, 너 때문에 번져도" },
    { time: 104.17, line: "Just dance, dance, dance" },
    { time: 106.83, line: "Keep dance, dance, dance, people" },
    { time: 109.13, line: "이 밤이 지나가기 전에, do it right now" },
    { time: 114.25, line: "느낌이 와 너와 나 사이 something so loud?" },
    { time: 119.57, line: "그 입술로 내게 (내게)" },
    { time: 122.46, line: "사랑한다고 말해, ooh, baby" },
    { time: 127.29, line: "빨간 립스틱, 진하게 바르고" },
    { time: 131.29, line: "So dance, dance, dance" },
    { time: 133.03, line: "Keep on dance, dance, dance, people" },
    { time: 136.27, line: "빨간 립스틱, 너 때문에 번져도" },
    { time: 140.2, line: "Just dance, dance, dance" },
    { time: 142.08, line: "Keep on dance, dance, dance, people" },
    { time: 145.28, line: "La-di-da-li, move your body" },
    { time: 147.31, line: "Don't stop 우리 하나 될 때 까지" },
    { time: 149.48, line: "6 in the morning and we still going" },
    { time: 151.61, line: "Dance, dance, dance, people" },
    { time: 154.25, line: "La-di-da-li, move your body" },
    { time: 156.34, line: "Don't stop 우리 하나 될 때 까지" },
    { time: 158.46, line: "6 in the morning and we still going" },
    { time: 160.57, line: "Dance, dance, dance, people" },
    { time: 162.68, line: "화려한 디스코 조명 아래서 (조명 아래서)" },
    { time: 166.65, line: "너와 나 둘이 이 밤을 새워 (이 밤을 새워)" },
    { time: 171.18, line: "화려한 디스코 빛을 받으며 (빛을 받으며, yeah)" },
    { time: 176.08, line: "Just dance, dance, dance (uh-huh)" },
    { time: 178.18, line: "Keep on dance, dance, dance, people" },
    { time: 181.13, line: "A party ain't a party, hahaha, sike" },
  ];
  useEffect(() => {
    const element = lyricRef.current?.querySelector(
      `[data-id="${currentIndex}"]`
    ) as HTMLElement | null;
    if (!element) return;
    scrollRef.current!.scrollTo({
      top: element.offsetTop - 30 - scrollRef.current!.clientHeight / 3,
      behavior: "smooth",
    });
  }, [currentIndex, scrollRef]);
  return (
    <div ref={lyricRef}>
      <PlaceholderLyric lyrics={lyrics} setCurrentIndex={setCurrentIndex} />
      {lyrics.map((item, idx) => (
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
    </div>
  );
}

export default Lyric;
