import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import clsx from "clsx";
import { useContext } from "react";
import AudioCu from "./AudioCu";
import { AnimatePresence } from "motion/react";

function AudioCurImg() {
  const { open } = useContext(Context);
  return (
    <div
      className={clsx(
        " lg:h-[270px] h-[100%]  mx-auto lg:mx-0 aspect-square shrink-0 grow-0 fallbackAspect bg-[#343333] short:opacity-0 short:absolute  overflow-hidden relative"
      )}
    >
      <AnimatePresence>{open && <AudioCu />}</AnimatePresence>
    </div>
  );
}

export default AudioCurImg;
