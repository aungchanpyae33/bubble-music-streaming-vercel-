"use server";

import { createClient } from "@/database/server";

export const removeFromLibrary = async (
  id: string,
  source: "create" | "reference"
) => {
  try {
    const supabase = await createClient();
    if (source === "create") {
      const { error } = await supabase.rpc("delete_user_playlist_item", {
        p_item_id: id,
      });
      return { error };
    } else {
      const { error } = await supabase.rpc("delete_user_reference_item", {
        refer_item_id: id,
      });
      return { error };
    }
  } catch (error) {
    return { error };
  }
};
