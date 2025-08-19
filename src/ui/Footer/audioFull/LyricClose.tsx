import { lyricShowAction, useLyric } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { ChevronDown } from "lucide-react";

function LyricClose() {
  const setLyricShow = useLyric((state: lyricShowAction) => state.setLyricShow);
  return (
    <button
      className=" absolute px-2 border border-gray-100/65 py-1 right-0"
      onClick={() => setLyricShow(false)}
    >
      <IconWrapper Icon={ChevronDown} size="medium" />
    </button>
  );
}

export default LyricClose;
