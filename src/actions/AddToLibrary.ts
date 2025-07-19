"use server";

import { getSongsReturn } from "@/database/data";
import { createClient } from "@/database/server";

export const addToLibrary = async (
  id: string,
  type: getSongsReturn["type"]
) => {
  try {
    const supabase = await createClient();
    let { data, error } = await supabase.rpc("add_to_library", {
      p_item_id: id,
      p_item_type: type,
    });

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
