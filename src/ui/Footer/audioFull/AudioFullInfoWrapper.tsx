import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ShowBlock, ShowBlockAction, useShowBlock } from "@/lib/zustand";
import { useContext, useEffect } from "react";
import LyricContainer from "./LyricContainer";
import QueueFull from "@/ui/Queue/QueueFull";
import CloseShowBlockBtn from "./CloseShowBlockBtn";
import Image from "next/image";
import { DataContext } from "@/lib/MediaSource/ContextMedia";
import ArtistWrapper from "@/ui/general/ArtistWrapper";
import ToolTip from "@/ui/general/ToolTip";
import dynamic from "next/dynamic";
import LyricPaddingBlock from "./LyricPaddingBlock";
const QueueFullLazy = dynamic(() => import("@/ui/Queue/QueueFull"), {
  loading: () => <p>i am loading</p>,
});
function AudioFullInfoWrapper({ children }: { children: React.ReactNode }) {
  const showBlock = useShowBlock((state: ShowBlock) => state.showBlock);
  const setShowBlock = useShowBlock(
    (state: ShowBlockAction) => state.setShowBlock
  );
  const { name, artists, cover_url } = useContext(DataContext);
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
            " flex items-center shrink-0 grow-0  overflow-hidden w-[90%] max-w-[384px] lg:w-[270px]"
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
              {name}
            </p>
            <div className={clsx(" text-zinc-100  lg:text-xl text-base flex")}>
              <ArtistWrapper artists={artists} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          " bg-[#222222]  will-change-transform  left-auto lg:grid-rows-[8px_1fr_8px] lg:w-[50%] w-full  inset-0  absolute grid grid-rows-[60px_8px_1fr_8px]    shadow-md   transition-[opacity,transform] duration-500",
          {
            "translate-y-0": showBlock.open,
            "translate-y-[103%]": !showBlock.open,
          }
        )}
        tabIndex={-1}
      >
        <div
          className={clsx(
            "flex lg:hidden gap-x-3   border-b border-white      items-center w-full"
          )}
        >
          <div className={clsx("relative border-b border-white  size-[60px]")}>
            {cover_url && (
              <Image
                src={cover_url}
                alt="this is image element"
                fill
                sizes="60px"
              />
            )}
          </div>
          <div
            className="flex-1 flex-col  overflow-hidden
              flex justify-center"
          >
            <ToolTip tooltipContent={name}>
              <div
                className="truncate
              "
              >
                {name}
              </div>
            </ToolTip>

            <div className="truncate flex ">
              <ArtistWrapper artists={artists} />
            </div>
          </div>
          <CloseShowBlockBtn />
        </div>
        <LyricPaddingBlock />
        <AnimatePresence mode="wait" initial={false}>
          {showBlock.type === "lyric" && showBlock.open && (
            <LyricContainer type={showBlock.type} key={"lyric"} />
          )}
          {showBlock.type === "queue" && showBlock.open && (
            <QueueFullLazy key={"queue"} />
          )}
        </AnimatePresence>
        <LyricPaddingBlock />
      </div>
    </div>
  );
}

export default AudioFullInfoWrapper;
