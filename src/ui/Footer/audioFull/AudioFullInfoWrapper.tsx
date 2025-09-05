import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import LyricPaddingBlock from "./LyricPaddingBlock";
import { ShowBlock, ShowBlockAction, useShowBlock } from "@/lib/zustand";
import { useEffect } from "react";
import LyricContainer from "./LyricContainer";
import QueueFull from "@/ui/Queue/QueueFull";
import CloseShowBlockBtn from "./CloseShowBlockBtn";
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
    <div className=" mx-auto   w-[90%]  flex-1 flex     relative overflow-hidden ">
      <motion.div
        layout
        className={clsx(
          "lg:items-end will-change-transform relative lg:w-[50%]  gap-2 lg:gap-4 lg:justify-start overflow-hidden   flex   lg:flex-row   w-full",
          {
            "flex-col": !showBlock.open,
            "justify-start items-start": showBlock.open,
            "items-center justify-center": !showBlock.open,
          }
        )}
      >
        <motion.div
          layout
          className={clsx(
            " flex items-center shrink-0 grow-0  overflow-hidden  lg:h-auto",
            {
              "h-[80%] max-h-[90vw]": !showBlock.open,
              "h-[60px]": showBlock.open,
            }
          )}
        >
          {children}
        </motion.div>
        <motion.div
          layout
          className={clsx("min-h-[60px] max-w-fit  flex  items-center", {
            "flex-1": showBlock.open,
            "self-start lg:self-auto": !showBlock.open,
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
                  " scale-90 lg:scale-100 ": showBlock.open,
                  "scale-100 ": !showBlock.open,
                }
              )}
            >
              Supanova
            </p>
            <p
              className={clsx(
                " text-zinc-100  lg:text-xl text-base transition-transform origin-left  duration-500",
                {
                  " scale-90 lg:scale-100 ": showBlock.open,
                  "scale-100 ": !showBlock.open,
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
          " bg-black  left-auto  lg:w-[50%] w-full   px-[36px] inset-0 top-[60px] absolute grid grid-rows-[36px_1fr_36px] transition-[opacity,transform] duration-500",
          {
            "translate-y-0": showBlock.open,
            "translate-y-full": !showBlock.open,
          }
        )}
        tabIndex={-1}
      >
        <LyricPaddingBlock />
        {showBlock.open && <CloseShowBlockBtn />}
        <div className=" relative w-full h-full overflow-hidden ">
          <AnimatePresence>
            {showBlock.open && (
              <motion.div
                exit={{ opacity: 0.99 }}
                transition={{ duration: 0.5 }}
                className={clsx(
                  " w-[200%] inset-0 transition-transform duration-500 ease-in-out flex will-change-transform   absolute",
                  {
                    "-translate-x-1/2 -left-1": showBlock.type === "queue",
                  }
                )}
              >
                <LyricContainer type={showBlock.type} />
                <QueueFull />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <LyricPaddingBlock />
      </div>
    </div>
  );
}

export default AudioFullInfoWrapper;
