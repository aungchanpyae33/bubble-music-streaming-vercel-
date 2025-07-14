import { getSongsReturn } from "@/database/data";

const outputCurrentIndex = (
  songsData: getSongsReturn,
  currentUrl: string,
  uni_id: string | undefined
) => {
  const currentIndex = songsData.songs.findIndex((song) => {
    if (songsData?.might_repeat && uni_id) {
      return song.url === currentUrl && song.uni_id === uni_id;
    }
    return song.url === currentUrl;
  });
  return currentIndex;
};

export default outputCurrentIndex;
