"use server";

import { createClient } from "@/database/server";

export const insertSongtoPlaylist = async ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}) => {
  try {
    const supabase = await createClient();
    let { data, error } = await supabase.rpc("add_playlist_song", {
      p_id: playlistId,
      s_id: songId,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error: error };
  }
};
