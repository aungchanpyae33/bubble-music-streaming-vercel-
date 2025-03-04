"use client";
import { queueState, useOnlyOneSider } from "@/lib/zustand";
import clsx from "clsx";

function Queue() {
  const isQueue = useOnlyOneSider((state: queueState) => state.isQueue);
  return (
    <div
      className={clsx(
        "  bg-black  h-full text-white w-[20%] md:w-[25%] min-w-[250px] flex flex-col  max-w-[375px] overflow-y-auto",
        {
          hidden: !isQueue,
          "hidden md:block": isQueue,
        }
      )}
    >
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
      <div className="p-5 hover:bg-red-800">upNext Song</div>
    </div>
  );
}

export default Queue;
