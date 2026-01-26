"use server";

import { createClient } from "@/database/server";

export const setListEmbedding = async (
  type: "album" | "playlist" | "artist",
  id: string,
) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("update_user_embedding_list", {
      p_type: type,
      p_id: id,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
