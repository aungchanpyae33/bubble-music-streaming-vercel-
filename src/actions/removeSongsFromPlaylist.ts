"use server";

import { createClient } from "@/database/server";
export const removeSongsFromPlaylist = async (
  playlistId: string,
  songId: number
) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("delete_playlist_song", {
      p_id: playlistId,
      s_id: songId,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
