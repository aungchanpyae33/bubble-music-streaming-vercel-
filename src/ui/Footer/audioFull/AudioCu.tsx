import useGetDominantColor from "@/lib/GetDominantColor";
import Image from "next/image";
import { useContext, useRef } from "react";
import { ContextBackGround } from "./AudioFullBackGround";
import clsx from "clsx";
import { motion } from "motion/react";
function AudioCu() {
  const { setBgValue } = useContext(ContextBackGround);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isImageLoaded] = useGetDominantColor({ setBgValue, imgRef });
  return (
    <motion.div exit={{ opacity: 0.9 }} transition={{ duration: 0.5 }}>
      <Image
        ref={imgRef}
        src={
          "https://s3.tebi.io/test1345/photo-1739467372234-2aba33f6b7ee.avif"
        }
        alt="this is image element"
        fill
      />
      {isImageLoaded === "error" && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 whitespace-nowrap    -translate-x-1/2">
          some image to show image
        </div>
      )}
    </motion.div>
  );
}

export default AudioCu;
