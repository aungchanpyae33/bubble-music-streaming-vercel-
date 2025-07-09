"use server";

import { createClient } from "@/database/server";

export const checkSongsBeforeAdd = async ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: number;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("playlist_songs")
    .select("id") // only need one field
    .eq("playlist_id", playlistId)
    .eq("song_id", songId)
    .maybeSingle();

  if (error) {
    console.error("Error checking playlist:", error);
    return { exists: false, error };
  }

  const exists = !!data; // true if song already in playlist
  return { exists };
};
