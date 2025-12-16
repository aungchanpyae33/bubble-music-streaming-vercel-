"use server";

import { getPlaylistPageProps } from "@/database/data";
import { createClient } from "@/database/server";
import { deepMapById } from "@/lib/returnById";
import type { PostgrestError } from "@supabase/supabase-js";
export const removeSongsFromPlaylist = async ({
  playlistId,
  id,
}: {
  playlistId: string;
  id: string;
}): Promise<{
  data: getPlaylistPageProps | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase.rpc("delete_playlist_song", {
      p_id: playlistId,
      target_id: id,
    })) as { data: getPlaylistPageProps | null; error: PostgrestError | null };

    const mappedData = data ? deepMapById(data, ["songs.songs"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};
