import { listSongsSection } from "@/database/data";

const excludeCurrentSongs = (
  urlProp: listSongsSection,
  currentIndex: number,
) => {
  return [
    ...urlProp.idArray.slice(0, currentIndex),
    ...urlProp.idArray.slice(currentIndex + 1),
  ];
};
export default excludeCurrentSongs;
