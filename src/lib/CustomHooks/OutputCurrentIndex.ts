import { getSongsReturn } from "@/database/data";

const outputCurrentIndex = (
  songsData: getSongsReturn,
  currentUrl: string,
  uni_id: string
) => {
  const currentIndex = songsData.songs.findIndex((song) => {
    return song.url === currentUrl && song.uni_id === uni_id;
  });
  return currentIndex;
};

export default outputCurrentIndex;
