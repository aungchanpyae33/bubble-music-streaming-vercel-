import { getSongsReturn } from "@/database/data";

interface outputUniUrlRetrun {
  playlistId: string;
  uniUrl: string;
}

const outputUniUrl = (
  playlistSong: getSongsReturn | undefined,
  uni_id: string | undefined,
  url: string
): outputUniUrlRetrun => {
  let playlistId: string =
    playlistSong && playlistSong.id ? playlistSong.id : `create-on-fly-${url}`;
  let outputUrl = uni_id + url;
  const uniUrl = `${outputUrl},${playlistId}`;
  return { playlistId, uniUrl };
};

export default outputUniUrl;
