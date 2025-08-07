"use client";
import { useContext } from "react";
import { removeLike } from "@/actions/removeLike";
import { addLike } from "@/actions/addLike";
import { usePairStoreZustand } from "@/lib/CustomHooks/PairStoreZustand";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import IconWrapper from "../general/IconWrapper";
import { Heart } from "lucide-react";
import clsx from "clsx";
import OptionItem from "../general/optionBox/OptionItem";
import { InfoTrackContext } from "./ContextInfoTrack";
import OptionButton from "../general/optionBox/OptionButton";

function ToggleHeartContent() {
  const { song } = useContext(InfoTrackContext);
  const isLike = song?.is_liked;
  const songId = song?.song_id!;
  const store = usePairStoreZustand(`${songId}`);
  const like = store((s) => s.like);
  const setLike = store((s) => s.setLike);
  const likeOutput = like === undefined ? isLike : like;
  const removeLikeAction = removeLike.bind(null, songId);
  const addLikeAction = addLike.bind(null, songId);

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
      <OptionButton onClick={handleLike}>
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
      </OptionButton>
    </OptionItem>
  );
}
export default ToggleHeartContent;
