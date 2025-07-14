import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import { ListEnd } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import {
  currentAddToQueueAction,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";

function AddToQueeue() {
  const { setShow } = useContext(ContextMoreOption);
  const { song } = useContext(InfoTrackContext);
  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue
  );
  if (!song?.uni_id) return null;
  const addUniIdSong = { ...song, uni_id: crypto.randomUUID() };
  const queueSong = addUniIdSong && [addUniIdSong];
  function addToQueue() {
    currentAddToQueue(queueSong);
    setShow(false);
  }
  return (
    <OptionItem>
      <OptionButton onClick={addToQueue}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListEnd} />
        </OptionIconEl>

        <span>add to the queeue </span>
      </OptionButton>
    </OptionItem>
  );
}

export default AddToQueeue;
