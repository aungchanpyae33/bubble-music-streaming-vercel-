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
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";

function RemoveFromQueue() {
  const { setShow } = useContext(ContextMoreOption);
  const { song } = useContext(InfoTrackContext);
  const removeFromQueue = useRepeatAndCurrentPlayList(
    (state: removeFromQueueAction) => state.removeFromQueue
  );

  if (!song) return null;
  const { id } = song;

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
