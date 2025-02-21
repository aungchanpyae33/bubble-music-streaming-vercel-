"use client";
import { useRef } from "react";
import AudioPlayerWrapper from "./AudioPlayerWrapper";
function FooterBar() {
  const footerRef = useRef<HTMLElement | null>(null);
  return (
    <footer
      className="fixed bottom-0 w-full  flex bg-white  items-center  h-[70px]"
      ref={footerRef}
    >
      <AudioPlayerWrapper footerRef={footerRef} />
    </footer>
  );
}

export default FooterBar;
