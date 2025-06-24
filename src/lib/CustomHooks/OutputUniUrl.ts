import { getSongsReturn } from "@/database/data";

interface outputUniUrlRetrun {
  playlistId: string;
  uniUrl: string;
}

const outputUniUrl = (
  playlistSong: getSongsReturn | undefined,
  might_repeat: boolean | undefined,
  uni_id: number | undefined,
  url: string
): outputUniUrlRetrun => {
  let playlistId: string =
    playlistSong && playlistSong.id ? playlistSong.id : `create-on-fly-${url}`;
  let outputUrl = might_repeat ? uni_id + url : url;
  const uniUrl = `${outputUrl},${playlistId}`;
  return { playlistId, uniUrl };
};

export default outputUniUrl;
