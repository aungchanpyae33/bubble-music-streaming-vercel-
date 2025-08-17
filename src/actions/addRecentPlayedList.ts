"use server";

import { createClient } from "@/database/server";
import { Database } from "../../database.types";
import { PostgrestError } from "@supabase/supabase-js";

export const addRecentlyPlayedList = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"]
): Promise<{ error: PostgrestError | any | null }> => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("add_recently_played", {
      p_item_id: id,
      p_type: type,
    });
    return { error };
  } catch (error) {
    return { error };
  }
};
