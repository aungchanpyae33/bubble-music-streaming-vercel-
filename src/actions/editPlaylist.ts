"use server";

import { createClient } from "@/database/server";
import { deepMapById } from "@/lib/returnById";

export const editPlaylist = async ({
  playlistId,
  playlistName,
  check_type,
}: {
  playlistId: string;
  playlistName: string;
  check_type: boolean;
}) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("edit_playlist", {
      p_playlist_id: playlistId,
      p_new_name: playlistName,
      check_type,
    });
    const userLib = {
      userLib: data,
    };

    const mappedData = data ? deepMapById(userLib, ["userLib"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { data: null, error };
  }
};
