import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import { ListEnd } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";
import {
  currentAddToQueueAction,
  useRepeatAndCurrentPlayList,
} from "@/lib/zustand";
import { generateUUID } from "@/lib/GenerateUUID";
import { fetcher } from "@/database/dataApi";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
function AddSSonglistToQueue() {
  const { setShow } = useContext(ContextMoreOption);
  const { id, type } = useContext(SongListContext);
  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue
  );
  async function addSongListToQueue() {
    const data = await fetcher(id);
    const updatedSongs = data!.songs.map((song) => ({
      ...song,
      uni_id: generateUUID(),
    }));
    currentAddToQueue(updatedSongs);
    setShow(false);
  }
  return (
    <OptionItem>
      <OptionButton onClick={addSongListToQueue}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListEnd} />
        </OptionIconEl>

        <span>add to the queeue </span>
      </OptionButton>
    </OptionItem>
  );
}

export default AddSSonglistToQueue;
