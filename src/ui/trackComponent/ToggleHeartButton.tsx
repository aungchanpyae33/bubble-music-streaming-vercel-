"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { addLike } from "@/actions/addLike";
import { removeLike } from "@/actions/removeLike";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { usePairStoreZustand } from "@/lib/CustomHooks/PairStoreZustand";

function ToggleHeartButton({
  like,
  songId,
}: {
  like: boolean;
  songId: number;
}) {
  const [isLike, setIsLike] = useState(like);
  const { user } = useKindeAuth();
  const userId = user && user.id;
  const addLikeAction = addLike.bind(null, userId, songId);

  // const store = getPairStore(`${songId}`);
  const store = usePairStoreZustand(`${songId}`);
  const setLike = store((s) => s.setLike);

  const removeLikeAction = removeLike.bind(null, userId, songId);
  const likeZustand = store((s) => s.like);
  useEffect(() => {
    if (likeZustand !== undefined) setIsLike(likeZustand);
  }, [likeZustand]);

  async function handleLike() {
    if (isLike) {
      const { error } = await removeLikeAction();
      if (error) {
        console.log("failed to removelike");
      } else {
        setIsLike(false);
        setLike(false);
      }
    } else {
      const { error } = await addLikeAction();
      if (error) {
        console.log("failed to like");
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
          "fill-white": isLike,
        })}
      />
    </button>
  );
}

export default ToggleHeartButton;
