import { useContext, useRef } from "react";
import AudioInfoOverFlow from "./AudioInfoOverFlow";
import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";

function AudioInfo({ name }: { name: string }) {
  const { open } = useContext(Context);
  const ofcheckDiv = useRef(null);
  return (
    <div
      ref={ofcheckDiv}
      className=" flex-1
  overflow-hidden"
    >
      {!open && <AudioInfoOverFlow ofcheckDiv={ofcheckDiv} name={name} />}
    </div>
  );
}

export default AudioInfo;
