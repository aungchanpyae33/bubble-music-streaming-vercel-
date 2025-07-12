"use client";
import { useContext } from "react";
import { removeLike } from "@/actions/removeLike";
import { addLike } from "@/actions/addLike";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { usePairStoreZustand } from "@/lib/CustomHooks/PairStoreZustand";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import IconWrapper from "../general/IconWrapper";
import { Heart } from "lucide-react";
import clsx from "clsx";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";

function ToggleHeartContent() {
  const { isLike, songId } = useContext(InfoTrackContext);
  const { user } = useKindeAuth();
  const userId = user && user.id;
  const store = usePairStoreZustand(`${songId}`);
  const like = store((s) => s.like);
  const setLike = store((s) => s.setLike);
  const likeOutput = like === undefined ? isLike : like;
  const removeLikeAction = removeLike.bind(null, userId, songId);
  const addLikeAction = addLike.bind(null, userId, songId);

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

  return (
    <OptionItem>
      <button className="flex items-center" onClick={handleLike}>
        <OptionIconEl>
          <IconWrapper
            Icon={Heart}
            size="small"
            className={clsx("", {
              "fill-white": likeOutput,
            })}
          />
        </OptionIconEl>
        <span>{likeOutput ? "Remove like" : "Add like"}</span>
      </button>
    </OptionItem>
  );
}
export default ToggleHeartContent;
