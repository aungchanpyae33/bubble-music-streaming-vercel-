import { ReactNode, useRef } from "react";
import Lyric from "./Lyric";

function LyricContainer({ lyricShow }: { lyricShow: boolean }) {
  const lyricRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={lyricRef}
      className="overflow-auto relative no-scrollbar [transform:translateZ(0)] py-2 "
    >
      <Lyric lyricRef={lyricRef} lyricShow={lyricShow} />
    </div>
  );
}

export default LyricContainer;
