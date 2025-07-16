import { getSongsReturn } from "@/database/data";

const outputCurrentIndexV2 = (
  songsData: getSongsReturn,
  id: string,
  uni_id: string
) => {
  const currentIndex = songsData.songs.findIndex((song) => {
    return song.url === id && song.uni_id === uni_id;
  });
  return currentIndex;
};

export default outputCurrentIndexV2;
