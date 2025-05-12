import { useEffect, useRef } from "react";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import AddSongButton from "./AddSongButton";
import ToggleHeartContent from "./ToggleHeartContent";
import RemoveSongButton from "./RemoveSongButton";
import SetFocusMounted from "@/lib/CustomHooks/SetFocusMounted";

function ContentChild() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  SetFocusMounted({ refFocus: containerRef });
  return (
    <FocusTrap refFocus={containerRef} className=" w-full h-full">
      <div tabIndex={0} ref={containerRef} className="w-full h-full">
        <h1 className=" h-10">test content</h1>
        <AddSongButton />
        <RemoveSongButton />
        <ToggleHeartContent />
        <h1 className=" h-10">test content</h1>
        <h1 className=" h-10">test content</h1>
        <h1 className="h-10">test content</h1>
      </div>
    </FocusTrap>
  );
}

export default ContentChild;
