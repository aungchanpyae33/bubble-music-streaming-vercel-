import {
  addSongsToPlaylist,
  addSongsToPlaylistProps,
  songExistAction,
  songsToPlaylist,
  useAddSongsToPlaylist,
  useIsExistSongs,
} from "@/lib/zustand";
import useAddSongMutate from "@/lib/CustomHooks/mutation/AddSongMutate";
import { checkSongsBeforeAddClient } from "@/database/client-data";

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
  const mutation = useAddSongMutate(playlistId);
  async function handleAdd() {
    addSongsToPlaylist({});
    const { exists } = await checkSongsBeforeAddClient({
      playlistId: playlistId,
      songId: songId,
    });

    if (!exists) {
      mutation.mutate({
        playlistId: playlistId,
        songId: songId,
      });
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
