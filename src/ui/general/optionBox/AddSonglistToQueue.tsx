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
import { generateUUID } from "@/lib/GenerateUUID";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { getPlaylistSongsApi } from "@/database/dataApi";

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
    const { data, error } = await getPlaylistSongsApi(id);
    if (!data || error) return;
    const songsData = data[0];
    const updatedSongs = songsData.songs.map((song) => ({
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

export default AddSonglistToQueue;
