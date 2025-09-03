import { useRef } from "react";
import Lyric from "./Lyric";
import clsx from "clsx";

function LyricContainer({ type }: { type: "lyric" | "queue" | undefined }) {
  const lyricRef = useRef<HTMLDivElement>(null);
  const dynamic = type === "lyric";
  return (
    <div
      ref={lyricRef}
      className={clsx(
        "flex-1 relative overflow-auto  no-scrollbar [transform:translateZ(0)] my-2 "
      )}
    >
      <Lyric lyricRef={lyricRef} lyricShow={dynamic} />
    </div>
  );
}

export default LyricContainer;
