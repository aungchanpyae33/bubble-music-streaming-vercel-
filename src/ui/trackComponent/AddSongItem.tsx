import {
  addSongsToPlaylist,
  addSongsToPlaylistProps,
  songExistAction,
  songsToPlaylist,
  useAddSongsToPlaylist,
  useIsExistSongs,
} from "@/lib/zustand";
import { useContext } from "react";
import { ContextMoreOption } from "./MoreOptionContext";
import { checkSongsBeforeAdd } from "@/actions/checkSongsBeforeAdd";
import useAddSongMutate from "@/lib/CustomHooks/AddSongMutate";
import { ContextPlaylistInfoTrack } from "./PlaylistInfoContextTrack";

function AddSongItem({
  playlistSongs,
}: {
  playlistSongs: {
    id: string;
    name: any;
  };
}) {
  const setIsSongExist = useIsExistSongs(
    (state: songExistAction) => state.setIsSongExist
  );
  const addSongsToPlaylist = useAddSongsToPlaylist(
    (state: addSongsToPlaylist) => state.addSongsToPlaylist
  );
  const playlistId = playlistSongs.id;
  const { songId } = useAddSongsToPlaylist(
    (state: songsToPlaylist) => state.songsToPlaylist
  ) as addSongsToPlaylistProps;

  const mutation = useAddSongMutate({ songId: songId, playlistId: playlistId });
  const { setShow } = useContext(ContextMoreOption);
  async function handleAdd() {
    addSongsToPlaylist({});
    setShow(false);
    const { exists } = await checkSongsBeforeAdd({
      playlistId: playlistId,
      songId: songId,
    });
    console.log(exists);
    if (!exists) {
      mutation.mutate();
    } else {
      setIsSongExist({ playlistId: playlistId, songId: songId });
    }
  }
  return (
    <div>
      <button onClick={handleAdd}>{playlistSongs.name}</button>
    </div>
  );
}

export default AddSongItem;
