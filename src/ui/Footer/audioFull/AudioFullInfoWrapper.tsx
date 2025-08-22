import clsx from "clsx";
import { motion } from "motion/react";
import LyricPaddingBlock from "./LyricPaddingBlock";
import Lyric from "./Lyric";
import { lyricShowAction, lyricShowState, useLyric } from "@/lib/zustand";
import { useEffect, useRef } from "react";
import LyricClose from "./LyricClose";
function AudioFullInfoWrapper({ children }: { children: React.ReactNode }) {
  const lyricShow = useLyric((state: lyricShowState) => state.lyricShow);
  const setLyricShow = useLyric((state: lyricShowAction) => state.setLyricShow);

  useEffect(() => {
    return () => {
      setLyricShow(false);
    };
  }, [setLyricShow]);
  return (
    <div className=" mx-auto   w-[90%]  flex-1 flex     relative overflow-hidden ">
      <motion.div
        layout
        className={clsx(
          "lg:items-end relative lg:w-[50%]  gap-2 lg:gap-4 lg:justify-start overflow-hidden   flex   lg:flex-row   w-full",
          {
            "flex-col": !lyricShow,
            "justify-start items-start": lyricShow,
            "items-center justify-center": !lyricShow,
          }
        )}
      >
        <motion.div
          layout
          className={clsx(
            " flex items-center shrink-0 grow-0  overflow-hidden  lg:h-auto",
            {
              "h-[80%] max-h-[90vw]": !lyricShow,
              "h-[60px]": lyricShow,
            }
          )}
        >
          {children}
        </motion.div>
        <motion.div
          layout
          className={clsx("min-h-[60px] max-w-fit  flex  items-center", {
            "flex-1": lyricShow,
            "self-start lg:self-auto": !lyricShow,
          })}
        >
          <motion.div
            layout
            className="flex items-start  p-1 justify-center flex-col "
          >
            <p
              className={clsx(
                " text-zinc-100  text-xl lg:text-2xl transition-transform origin-left duration-500",
                {
                  " scale-90 lg:scale-100 ": lyricShow,
                  "scale-100 ": !lyricShow,
                }
              )}
            >
              Supanova
            </p>
            <p
              className={clsx(
                " text-zinc-100  lg:text-xl text-base transition-transform origin-left  duration-500",
                {
                  " scale-90 lg:scale-100 ": lyricShow,
                  "scale-100 ": !lyricShow,
                }
              )}
            >
              aspea
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      <div
        className={clsx(
          " bg-black  left-auto  lg:w-[50%] w-full   px-5 inset-0 top-[60px] absolute grid grid-rows-[35px_1fr_35px] transition-[opacity,transform] duration-500",
          {
            "translate-y-0": lyricShow,
            "translate-y-full": !lyricShow,
          }
        )}
        tabIndex={-1}
      >
        <LyricPaddingBlock />
        {lyricShow && <LyricClose />}
        <Lyric />
        <LyricPaddingBlock />
      </div>
    </div>
  );
}

export default AudioFullInfoWrapper;
