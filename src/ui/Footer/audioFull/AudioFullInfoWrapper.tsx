import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import LyricPaddingBlock from "./LyricPaddingBlock";
import { ShowBlock, ShowBlockAction, useShowBlock } from "@/lib/zustand";
import { useEffect } from "react";
import LyricContainer from "./LyricContainer";
import QueueFull from "@/ui/Queue/QueueFull";
import CloseShowBlockBtn from "./CloseShowBlockBtn";
import Image from "next/image";
function AudioFullInfoWrapper({ children }: { children: React.ReactNode }) {
  const showBlock = useShowBlock((state: ShowBlock) => state.showBlock);
  const setShowBlock = useShowBlock(
    (state: ShowBlockAction) => state.setShowBlock
  );
  useEffect(() => {
    return () => {
      setShowBlock(undefined);
    };
  }, [setShowBlock]);
  return (
    <div className=" mx-auto   w-[96%] md:w-[80%] lg:w-[90%]  flex-1 flex relative overflow-hidden ">
      <div
        className={clsx(
          "lg:items-end will-change-transform relative lg:w-[50%]  gap-2 lg:gap-4 lg:justify-start overflow-hidden flex-col flex   lg:flex-row items-center transition-[transform,opacity] duration-300 lg:scale-100 lg:translate-y-0 lg:opacity-100 justify-center w-full",
          {
            " scale-100 translate-y-0  opacity-100": !showBlock.open,
            " scale-90 -translate-y-10 opacity-0": showBlock.open,
          }
        )}
      >
        <div
          className={clsx(
            " flex items-center shrink-0 grow-0  overflow-hidden h-[80%] max-h-[90vw]  lg:h-auto"
          )}
        >
          {children}
        </div>
        <div
          className={clsx(
            "min-h-[60px] max-w-fit  flex  items-center self-start lg:self-auto"
          )}
        >
          <div className="flex items-start  p-1 justify-center flex-col ">
            <p className={clsx(" text-zinc-100  text-xl lg:text-2xl")}>
              Supanova
            </p>
            <p className={clsx(" text-zinc-100  lg:text-xl text-base")}>
              aspea
            </p>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          " bg-black will-change-transform  left-auto lg:grid-rows-[36px_1fr_36px] lg:w-[50%] w-full lg:top-[60px] inset-0  absolute grid grid-rows-[60px_1fr_36px] transition-[opacity,transform] duration-500",
          {
            "translate-y-0": showBlock.open,
            "translate-y-full": !showBlock.open,
          }
        )}
        tabIndex={-1}
      >
        <div
          className={clsx(
            "flex lg:hidden bg-transparent   items-center w-full"
          )}
        >
          <div className={clsx("relative size-[60px]")}>
            <Image
              src={
                "https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg"
              }
              alt="this is image element"
              fill
            />
          </div>
          <p>hello</p>
        </div>

        <LyricPaddingBlock className="hidden lg:block" />
        {showBlock.open && <CloseShowBlockBtn />}
        <AnimatePresence mode="wait">
          {showBlock.type === "lyric" && showBlock.open && (
            <LyricContainer type={showBlock.type} key={"lyric"} />
          )}
          {showBlock.type === "queue" && showBlock.open && (
            <QueueFull key={"queue"} />
          )}
        </AnimatePresence>
      </div>

      <LyricPaddingBlock />
    </div>
  );
}

export default AudioFullInfoWrapper;
