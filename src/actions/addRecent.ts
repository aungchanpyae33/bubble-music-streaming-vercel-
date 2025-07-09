"use server";

import { createClient } from "@/database/server";

export const addRecent = async (
  playlitId: string,
  playlistName: string
): Promise<{ error: any }> => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.rpc("add_recently_played_playlist", {
      p_playlist_id: playlitId,
      // p_playlist_name: playlistName,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
