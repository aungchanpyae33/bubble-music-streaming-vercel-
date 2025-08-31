import { ListMinus } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import OptionButton from "../general/optionBox/OptionButton";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import OptionItem from "../general/optionBox/OptionItem";
import { useContext } from "react";
import { ContextMoreOption } from "../trackComponent/MoreOptionContext";
import { InfoTrackContext } from "../trackComponent/ContextInfoTrack";
import {
  removeFromQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";

function RemoveFromQueue() {
  const { setShow } = useContext(ContextMoreOption);
  const { song } = useContext(InfoTrackContext);
  const removeFromQueue = useRepeatAndCurrentPlayList(
    (state: removeFromQueueAction) => state.removeFromQueue
  );
  const { id: id_scope } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;

  if (!song) return null;
  const { id } = song;
  // Prevent removing the currently playing song from the queue
  if (id === id_scope) return null;

  function removeFromQueueFn() {
    removeFromQueue(id);
    setShow(false);
  }
  return (
    <OptionItem>
      <OptionButton onClick={removeFromQueueFn}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListMinus} />
        </OptionIconEl>

        <span>remove from queue </span>
      </OptionButton>
    </OptionItem>
  );
}

export default RemoveFromQueue;
