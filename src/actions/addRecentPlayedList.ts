"use server";

import { createClient } from "@/database/server";
import { Database } from "../../database.types";
import type { PostgrestError } from "@supabase/supabase-js";
import { deepMapById } from "@/lib/returnById";
import { getRecentReturn } from "@/database/data";

export const addRecentlyPlayedList = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"]
): Promise<{
  data: getRecentReturn | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("add_recently_played", {
      p_item_id: id,
      p_type: type,
    });

    const mappedData = data ? deepMapById(data, ["recentlyPlayed"]) : null;
    if (mappedData && "recentlyPlayed" in mappedData) {
      return { data: mappedData["recentlyPlayed"], error };
    }
    return { data: null, error };
  } catch (error) {
    return { data: null, error };
  }
};
