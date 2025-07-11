// hooks/usePairStore.ts
import { useEffect } from "react";
import { getPairStore, releasePairStore } from "@/lib/zustand";

export function usePairStoreZustand(songId: string) {
  const store = getPairStore(songId);

  useEffect(() => {
    return () => {
      releasePairStore(songId);
    };
  }, [songId]);

  return store;
}
