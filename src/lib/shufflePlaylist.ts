import { listSongsSection } from "@/database/data";

const shufflePlaylist = (
  array: string[],
  isShuffle: boolean,
  listProp: listSongsSection,
  currentSongs: string,
  previousPlayListArray: listSongsSection
) => {
  const newCopyArray = array.slice();
  for (let i = newCopyArray.length - 1; i > 0; i--) {
    const n = Math.floor(Math.random() * (i + 1));
    [newCopyArray[i], newCopyArray[n]] = [newCopyArray[n], newCopyArray[i]];
  }
  return !isShuffle
    ? {
        ...listProp,
        idArray: [currentSongs, ...newCopyArray],
      }
    : previousPlayListArray;
};
export default shufflePlaylist;
