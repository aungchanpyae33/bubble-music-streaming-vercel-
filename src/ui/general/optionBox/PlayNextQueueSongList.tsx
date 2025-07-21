import { ListStart } from "lucide-react";
import OptionItem from "./OptionItem";
import OptionIconEl from "./OptionIconEl";
import OptionButton from "./OptionButton";
import IconWrapper from "../IconWrapper";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { getPlaylistSongsApi } from "@/database/dataApi";
import { generateUUID } from "@/lib/GenerateUUID";
import {
  currentAddToNextAction,
  currentAddToQueueAction,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useSong,
} from "@/lib/zustand";

function PlayNextQueueSongList() {
  const { setShow } = useContext(ContextMoreOption);
  const { id, type } = useContext(SongListContext);
  const currentAddToNext = useRepeatAndCurrentPlayList(
    (state: currentAddToNextAction) => state.currentAddToNext
  );
  const { id: songId, uni_id } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;
  if (!songId) return null;
  async function addToNextSonglist() {
    const { data, error } = await getPlaylistSongsApi(id);
    if (!data || error) return;
    const songsData = data[0];
    const updatedSongs = songsData.songs!.map((song) => ({
      ...song,
      uni_id: generateUUID(),
    }));
    currentAddToNext(updatedSongs, songId, uni_id);
    setShow(false);
  }
  return (
    <OptionItem>
      <OptionButton onClick={addToNextSonglist}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListStart} />
        </OptionIconEl>
        <span>Add to play next </span>
      </OptionButton>
    </OptionItem>
  );
}

export default PlayNextQueueSongList;
