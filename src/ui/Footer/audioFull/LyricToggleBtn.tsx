"use client";

import { lyricShowAction, useLyric } from "@/lib/zustand";
import IconWrapper from "@/ui/general/IconWrapper";
import { MicVocal } from "lucide-react";

function LyricToggleBtn() {
  const setLyricShow = useLyric((state: lyricShowAction) => state.setLyricShow);
  return (
    <button className="" onClick={() => setLyricShow()}>
      <IconWrapper Icon={MicVocal} size="large" />
    </button>
  );
}

export default LyricToggleBtn;
