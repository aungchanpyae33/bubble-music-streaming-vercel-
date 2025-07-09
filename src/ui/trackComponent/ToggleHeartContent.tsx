"use client";
import { useContext, useEffect } from "react";
import { getPairStore, releasePairStore } from "@/lib/zustand";
import { removeLike } from "@/actions/removeLike";
import { addLike } from "@/actions/addLike";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { ContextPlaylistInfoTrack } from "./PlaylistInfoContextTrack";

function ToggleHeartContent() {
  const { isLike, songId } = useContext(ContextPlaylistInfoTrack);
  const { user } = useKindeAuth();
  const userId = user && user.id;
  const store = getPairStore(`${songId}`);
  const like = store((s) => s.like);
  const setLike = store((s) => s.setLike);
  const likeOutput = like === undefined ? isLike : like;

  const removeLikeAction = removeLike.bind(null, userId, songId);
  const addLikeAction = addLike.bind(null, userId, songId);

  useEffect(() => {
    return () => {
      releasePairStore(`${songId}`);
    };
  }, [songId]);

  async function handleLike() {
    if (likeOutput) {
      const { error } = await removeLikeAction();
      if (error) {
        console.log("failed to removelike");
      } else {
        setLike(false);
      }
    } else {
      const { error } = await addLikeAction();
      if (error) {
        console.log("failed to like");
      } else {
        setLike(true);
      }
    }
  }

  return likeOutput ? (
    <button className=" h-10" onClick={handleLike}>
      Remove like
    </button>
  ) : (
    <button className=" h-10" onClick={handleLike}>
      add like
    </button>
  );
}
export default ToggleHeartContent;
