import { useRef } from "react";
import AudioInfoOverFlow from "./AudioInfoOverFlow";

function AudioInfo({ name }: { name: string }) {
  const ofcheckDiv = useRef(null);
  return (
    <div
      ref={ofcheckDiv}
      className=" flex-1
  overflow-hidden"
    >
      <AudioInfoOverFlow ofcheckDiv={ofcheckDiv} name={name} />
    </div>
  );
}

export default AudioInfo;
