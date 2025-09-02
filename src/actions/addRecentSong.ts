"use server";
import { createClient } from "@/database/server";
export const addRecentlySong = async (id: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("add_recent_song", {
      p_song_id: id,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
