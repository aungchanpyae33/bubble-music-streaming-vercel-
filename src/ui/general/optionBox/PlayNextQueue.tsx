import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import { ListStart } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";
import {
  currentAddToNextAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import { generateUUID } from "@/lib/GenerateUUID";

function PlayNextQueue() {
  const { setShow } = useContext(ContextMoreOption);
  const { song } = useContext(InfoTrackContext);
  const currentAddToNext = useRepeatAndCurrentPlayList(
    (state: currentAddToNextAction) => state.currentAddToNext
  );
  const { id, uni_id } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;
  console.log(id, uni_id);
  if (!song || !id || !uni_id) return null;
  const uuid = generateUUID();
  const addUniIdSong = { ...song, uni_id: uuid };
  const queueSong = addUniIdSong && [addUniIdSong];
  function addToNext() {
    currentAddToNext(queueSong, id, uni_id);
    setShow(false);
  }
  return (
    <OptionItem>
      <OptionButton onClick={addToNext}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListStart} />
        </OptionIconEl>
        <span>Add to play next </span>
      </OptionButton>
    </OptionItem>
  );
}

export default PlayNextQueue;
