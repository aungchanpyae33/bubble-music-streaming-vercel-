import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import OptionButton from "./OptionButton";
import OptionItem from "./OptionItem";
import { useContext } from "react";
import { ListEnd } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionIconEl from "./OptionIconEl";
import {
  currentAddToQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { getSongListClient } from "@/database/client-data";

function AddSonglistToQueue() {
  const { setShow } = useContext(ContextMoreOption);
  const { id, type } = useContext(SongListContext);
  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue
  );
  const { id: songId } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;
  if (!songId) return null;
  async function addSongListToQueue() {
    const { data, error } = await getSongListClient(id, type);

    if (!data || error) return;
    const { songs } = data;
    console.log(songs);
    if (!songs || songs.idArray.length < 1) return null;
    currentAddToQueue(songs, songs.idArray);
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

export default AddSonglistToQueue;
