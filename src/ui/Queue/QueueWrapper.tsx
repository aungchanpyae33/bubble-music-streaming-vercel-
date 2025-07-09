"use client";
import useScreenSize from "@/lib/CustomHooks/ScreenSizeDetecter";
import { queueState, queueStateAction, useOnlyOneSider } from "@/lib/zustand";
import { useEffect } from "react";

function QueueWrapper({ children }: { children: React.ReactNode }) {
  const isQueue = useOnlyOneSider((state: queueState) => state.isQueue);
  const setIsQueue = useOnlyOneSider(
    (state: queueStateAction) => state.setIsQueue
  );
  const isSmall = useScreenSize("(width >= 48rem)");
  useEffect(() => {
    if (isQueue) {
      setIsQueue(isSmall);
    }
  }, [isSmall, setIsQueue, isQueue]);
  return isQueue && children;
}

export default QueueWrapper;
