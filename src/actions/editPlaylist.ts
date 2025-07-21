"use server";

import { createClient } from "@/database/server";

export const editPlaylist = async ({
  playlistId,
  playlistName,
}: {
  playlistId: string;
  playlistName: string;
}) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("edit_playlist", {
      p_playlist_id: playlistId,
      p_new_name: playlistName,
    });
    return { data, error };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { data: null, error };
  }
};
