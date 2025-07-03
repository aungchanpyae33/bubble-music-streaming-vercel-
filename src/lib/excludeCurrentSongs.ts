import { getSongsReturn } from "@/database/data";

const excludeCurrentSongs = (urlProp: getSongsReturn, currentIndex: number) => {
  return [
    ...urlProp.songs.slice(0, currentIndex),
    ...urlProp.songs.slice(currentIndex + 1),
  ];
};
export default excludeCurrentSongs;
