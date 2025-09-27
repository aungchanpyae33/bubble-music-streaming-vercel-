"use server";

import { getPlaylistPageProps } from "@/database/data";
import { createClient } from "@/database/server";
import { deepMapById } from "@/lib/returnById";
import type { PostgrestError } from "@supabase/supabase-js";

export const insertSongtoPlaylist = async ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}): Promise<{
  data: getPlaylistPageProps | null;
  error: PostgrestError | any | null;
}> => {
  try {
    const supabase = await createClient();
    let { data, error } = (await supabase.rpc("add_playlist_song", {
      p_id: playlistId,
      s_id: songId,
    })) as { data: getPlaylistPageProps | null; error: PostgrestError | null };
    const mappedData = data ? deepMapById(data, ["songs.songs"]) : null;

    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error: error };
  }
};
