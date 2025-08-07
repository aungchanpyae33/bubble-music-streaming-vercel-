"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { addLike } from "@/actions/addLike";
import { removeLike } from "@/actions/removeLike";
import { usePairStoreZustand } from "@/lib/CustomHooks/PairStoreZustand";

function ToggleHeartButton({
  like,
  songId,
}: {
  like: boolean;
  songId: string;
}) {
  const [isLike, setIsLike] = useState(like);
  const addLikeAction = addLike.bind(null, songId);
  // const store = getPairStore(`${songId}`);
  const store = usePairStoreZustand(`${songId}`);
  const setLike = store((s) => s.setLike);

  const removeLikeAction = removeLike.bind(null, songId);
  const likeZustand = store((s) => s.like);
  useEffect(() => {
    if (likeZustand !== undefined) setIsLike(likeZustand);
  }, [likeZustand]);

  async function handleLike() {
    console.log(songId);
    if (isLike) {
      const { error } = await removeLikeAction();
      if (error) {
        console.log("failed to removelike", error);
      } else {
        setIsLike(false);
        setLike(false);
      }
    } else {
      const { error } = await addLikeAction();
      if (error) {
        console.log("failed to like", error);
      } else {
        setIsLike(true);
        setLike(true);
      }
    }
  }

  return (
    <button
      className=" group-hover:opacity-100 opacity-0 group-focus-within:opacity-100 "
      onClick={handleLike}
    >
      <IconWrapper
        Icon={Heart}
        size="small"
        className={clsx("", {
          "fill-[#3664ba] text-[#3664ba] ": isLike,
        })}
      />
    </button>
  );
}

export default ToggleHeartButton;
