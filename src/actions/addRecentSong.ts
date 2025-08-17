"use server";

import { createClient } from "@/database/server";
import { PostgrestError } from "@supabase/supabase-js";

export const addRecentlySong = async (
  song_id: string
): Promise<{ error: PostgrestError | any | null }> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("add_recent_song", {
      p_song_id: song_id,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
