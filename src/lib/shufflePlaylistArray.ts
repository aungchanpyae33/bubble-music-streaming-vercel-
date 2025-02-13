import { urlProp } from "@/ui/albumContainer/AudiosContainer";

const shufflePlaylistArray = (array: urlProp[]) => {
  const newCopyArray = array.slice();
  for (let i = newCopyArray.length - 1; i > 0; i--) {
    const n = Math.floor(Math.random() * (i + 1));
    [newCopyArray[i], newCopyArray[n]] = [newCopyArray[n], newCopyArray[i]];
  }
  return newCopyArray;
};
export default shufflePlaylistArray;
