"use server";

import { createClient } from "@/database/server";
export const removeSongsFromPlaylist = async ({
  playlistId,
  songId,
  uni_id,
}: {
  playlistId: string;
  songId: string;
  uni_id: string;
}) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("delete_playlist_song", {
      p_id: playlistId,
      s_id: songId,
      uni_id: uni_id,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
