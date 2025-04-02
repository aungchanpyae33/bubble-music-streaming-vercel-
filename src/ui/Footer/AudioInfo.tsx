import { useContext, useRef } from "react";
import AudioInfoOverFlow from "./AudioInfoOverFlow";
import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";

function AudioInfo({ name, isLink }: { name: string; isLink: boolean }) {
  const { open } = useContext(Context);
  const ofcheckDiv = useRef(null);
  return (
    <div
      ref={ofcheckDiv}
      className=" flex-1 
  overflow-hidden will-change-transform"
    >
      {/* <div className=" w-full whitespace-nowrap showtextoverflow">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
        expedita consectetur quam, aut consequatur harum!
      </div> */}
      {!open && (
        <AudioInfoOverFlow
          ofcheckDiv={ofcheckDiv}
          name={name}
          isLink={isLink}
        />
      )}
    </div>
  );
}

export default AudioInfo;
