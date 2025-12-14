"use client";

import { getLikedIdClient } from "@/database/client-data";
import {
  likeActionState,
  setLikeAction,
  useLikeActionStore,
} from "@/lib/zustand";
import { useQuery } from "@tanstack/react-query";
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
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const setLikeAction = useLikeActionStore(
    (state: setLikeAction) => state.setLikeAction
  );
  const likeAction = useLikeActionStore(
    (state: likeActionState) => state.likeAction[id || ""]
  );

  useEffect(() => {
    if (likeAction !== undefined) {
      setIsLike(likeAction);
    }
  }, [likeAction]);
  // const { data: queryData, error: queryError } = useQuery({
  //   queryKey: ["liked-id"],
  //   queryFn: () => getLikedIdClient(),
  // });
  // const { data, error } = queryData || {};
  // const [isLike, setIsLike] = useState(() => {
  //   if (!data || error) return false;
  //   const { userLike } = data;
  //   const isDataExist = userLike[id];
  //   if (isDataExist) return true;
  //   return false;
  // });
  const [isLike, setIsLike] = useState(false);
  const value = { isLike, setLikeAction };

  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
}

export default ContextLike;
