"use server";
import { createClient } from "@/database/server";

export const addLike = async (songId: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("addlike", {
      p_song_id: songId,
    });

    return { error };
  } catch (error) {
    return { error };
  }
};
