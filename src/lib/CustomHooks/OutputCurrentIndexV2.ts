import { getSongsReturn } from "@/database/data";

const outputCurrentIndexV2 = (
  songsData: getSongsReturn["songs"],
  id: string,
  uni_id: string
) => {
  const currentIndex = songsData.findIndex((song) => {
    return song.id === id && song.uni_id === uni_id;
  });
  return currentIndex;
};

export default outputCurrentIndexV2;
