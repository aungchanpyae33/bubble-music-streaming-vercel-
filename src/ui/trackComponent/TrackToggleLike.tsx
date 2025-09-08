"use client";
import { Heart } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import clsx from "clsx";
import { useContext } from "react";
import { addLike } from "@/actions/addLike";
import { removeLike } from "@/actions/removeLike";
import { LikeContext } from "./ContextLike";

function TrackToggleLike({ songId }: { songId: string }) {
  const { isLike, setLikeAction } = useContext(LikeContext);
  const addLikeAction = addLike.bind(null, songId);
  const removeLikeAction = removeLike.bind(null, songId);
  async function handleLike() {
    if (isLike) {
      const { error } = await removeLikeAction();
      if (error) {
        console.log("failed to removelike", error);
      } else {
        setLikeAction({ [songId]: false });
      }
    } else {
      const { error } = await addLikeAction();
      if (error) {
        console.log("failed to like", error);
      } else {
        setLikeAction({ [songId]: true });
      }
    }
  }

  return (
    <button className="" onClick={handleLike}>
      <IconWrapper
        Icon={Heart}
        size="exLarge"
        className={clsx("", {
          "fill-white": isLike,
        })}
      />
    </button>
  );
}

export default TrackToggleLike;
