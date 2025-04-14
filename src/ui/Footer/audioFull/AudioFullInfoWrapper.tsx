import { useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import LyricPaddingBlock from "./LyricPaddingBlock";
function AudioFullInfoWrapper({ children }: { children: React.ReactNode }) {
  const [change, setChange] = useState(false);

  return (
    <div className=" mx-auto  w-[90%]  flex-1 flex    relative overflow-hidden ">
      <motion.div
        layout
        className={clsx(
          "lg:items-end relative lg:w-[50%]  gap-2 lg:gap-4 lg:justify-start overflow-hidden   flex   lg:flex-row   w-full",
          {
            "flex-col": !change,
            "justify-start items-start": change,
            "items-center justify-center": !change,
          }
        )}
      >
        <motion.div
          layout
          className={clsx(
            " flex items-center shrink-0 grow-0  overflow-hidden  lg:h-auto",
            {
              "h-[80%] max-h-[90vw] rounded-md": !change,
              "h-[50px] rounded-none": change,
            }
          )}
        >
          {children}
        </motion.div>
        <motion.div
          layout
          className={clsx("min-h-[50px]  flex  items-center", {
            "flex-1": change,
            "self-start lg:self-auto": !change,
          })}
        >
          <motion.div
            layout
            className="flex items-start justify-center flex-col "
          >
            <p
              className={clsx("", {
                "text-sm lg:text-3xl": change,
                "lg:text-3xl text-2xl": !change,
              })}
            >
              Supanova
            </p>
            <p
              className={clsx(" text-zinc-400", {
                "text-sm lg:text-2xl": change,
                "lg:text-2xl text-xl": !change,
              })}
            >
              Aspea
              <button className="" onClick={() => setChange(!change)}>
                hello
              </button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      <div
        className={clsx(
          " bg-black  left-auto  lg:w-[50%] w-full  overflow-auto px-5 inset-0 absolute bottom-0 transition-[opacity,transform] no-scrollbar pb-[50px] duration-500",
          {
            "translate-y-[50px] opacity-100": change,
            "translate-y-full opacity-0": !change,
          }
        )}
      >
        {change && (
          <>
            <LyricPaddingBlock className="top-0" />
            reprehenderit sapiente cupiditate? A, eius libero Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Voluptatum suscipit quasi
            laborum modi porro tempora soluta commodi accusamus illo tenetur cum
            quia neque, amet, harum dignissimos molestias minus et hic nesciunt.
            Labore quo accusamus omnis quis dolores atque, beatae aspernatur,
            debitis reiciendis nisi dolorem reprehenderit qui tempora eveniet
            nulla dignissimos. Placeat necessitatibus beatae recusandae
            consectetur nulla, minus illum voluptatum debitis doloremque, dolore
            ea eos assumenda nobis at quam atque! Quos id iusto assumenda
            nostrum omnis veritatis recusandae optio tempora, nesciunt vel totam
            est fuga adipisci obcaecati accusantium voluptas consequuntur
            exercitationem veniam sed dolores. Possimus perspiciatis vitae eaque
            repellat, adipisci inventore debitis? Quia, quos. Repellendus
            dignissimos nostrum deleniti. Minima quasi consequuntur sed illo
            quam est ab repellat voluptatum quos aut, tempore omnis repellendus
            eius laboriosam amet unde at, sequi soluta quas earum cum voluptas
            ut. Totam sunt vel quasi. Officia possimus explicabo, corrupti,
            sapiente aperiam quisquam quod quaerat, nulla ratione illo
            repellendus minima optio maxime facere quibusdam nihil ea nemo id.
            Similique architecto nostrum fugiat sapiente ut aspernatur dolorum
            nihil, quo cupiditate saepe, odit optio, corporis aperiam voluptatem
            velit accusantium pariatur odio inventore soluta voluptate facilis
            eius tenetur ullam. Quaerat aliquam doloribus odit pariatur esse at
            suscipit nulla. Veniam, tempora iusto!
            <LyricPaddingBlock className=" bottom-0" />
          </>
        )}
      </div>
    </div>
  );
}

export default AudioFullInfoWrapper;
