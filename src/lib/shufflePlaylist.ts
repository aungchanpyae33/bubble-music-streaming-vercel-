import { getSongsReturn, song } from "@/database/data";

const shufflePlaylist = (
  array: song[],
  isShuffle: boolean,
  urlProp: getSongsReturn,
  currentSongs: song,
  previousPlayListArray: getSongsReturn
) => {
  const newCopyArray = array.slice();
  for (let i = newCopyArray.length - 1; i > 0; i--) {
    const n = Math.floor(Math.random() * (i + 1));
    [newCopyArray[i], newCopyArray[n]] = [newCopyArray[n], newCopyArray[i]];
  }
  return !isShuffle
    ? {
        id: urlProp.id,
        name: urlProp.name,
        related_id: urlProp.related_id,
        related_name: urlProp.related_name,
        songs: [currentSongs, ...newCopyArray],
      }
    : previousPlayListArray;
};
export default shufflePlaylist;
