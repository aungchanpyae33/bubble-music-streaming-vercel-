import { ListStart } from "lucide-react";
import OptionItem from "./OptionItem";
import OptionIconEl from "./OptionIconEl";
import OptionButton from "./OptionButton";
import IconWrapper from "../IconWrapper";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";

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
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { getSongListForQueue } from "@/database/client-data";

function PlayNextQueueSongList() {
  const { setShow } = useContext(ContextMoreOption);
  const { id, type } = useContext(SongListContext);
  const currentAddToNext = useRepeatAndCurrentPlayList(
    (state: currentAddToNextAction) => state.currentAddToNext
  );
  const { id: id_scoope } = useSong(
    (state: SongState) => state.songCu
  ) as SongDetail;
  if (!id_scoope) return null;
  async function addToNextSonglist() {
    const { data, error } = await getSongListForQueue(id, type);
    if (!data || error) return;
    const { songs } = data;

    currentAddToNext(songs, songs.idArray, id_scoope);
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
