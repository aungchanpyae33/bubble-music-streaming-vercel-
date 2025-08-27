"use server";

import { createClient } from "@/database/server";

export const removeLike = async (songId: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("removelike", {
      song_id: songId,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
