import { useRef } from "react";
import AudioInfoOverFlow from "./AudioInfoOverFlow";

function AudioInfo({ name }: { name: string }) {
  const ofcheckDiv = useRef(null);
  return (
    <div
      ref={ofcheckDiv}
      className="hidden md:block md:w-[150px]
    lg:w-[200px]
    overflow-hidden"
    >
      <AudioInfoOverFlow ofcheckDiv={ofcheckDiv} name={name} />
    </div>
  );
}

export default AudioInfo;
