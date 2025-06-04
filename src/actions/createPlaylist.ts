"use server";

import { createClient } from "@/database/server";

export const insertDataAction = async (playlist_name: string) => {
  try {
    const supabase = await createClient();
    let { data, error } = await supabase.rpc("insert_playlist", {
      playlist_name,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
