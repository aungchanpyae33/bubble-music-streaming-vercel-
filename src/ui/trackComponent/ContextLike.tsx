"use client";

import { SongInfo } from "@/database/data";
import {
  likeActionState,
  setLikeAction,
  useLikeActionStore,
} from "@/lib/zustand";
import { createContext, SetStateAction, useEffect, useState } from "react";

interface LikeContextProps {
  isLike: boolean;
  setLikeAction: (value: Record<string, boolean>) => void;
}

export const LikeContext = createContext<LikeContextProps>({
  isLike: false,
  setLikeAction: () => {},
});
function ContextLike({
  children,
  like,
  id,
}: {
  children: React.ReactNode;
  like: boolean;
  id: string;
}) {
  const setLikeAction = useLikeActionStore(
    (state: setLikeAction) => state.setLikeAction
  );
  const likeAction = useLikeActionStore(
    (state: likeActionState) => state.likeAction[id || ""]
  );
  const [isLike, setIsLike] = useState(like);

  useEffect(() => {
    if (likeAction !== undefined) {
      setIsLike(likeAction);
    }
  }, [likeAction]);
  const value = { isLike, setLikeAction };

  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
}

export default ContextLike;
