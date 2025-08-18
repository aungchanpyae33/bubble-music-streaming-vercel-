"use server";
import { createClient } from "@/database/server";
export const insertDataActionWithSongs = async (queryData: FormData) => {
  const supabase = await createClient();
  const playlistname = queryData.get("playlistname");
  if (!playlistname || typeof playlistname !== "string") {
    return { data: null, error: "Invalid playlist name" };
  }
  let { data, error } = await supabase.rpc("insert_playlist_with_songs", {
    playlist_name: playlistname,
    song_ids: [2, 5, 6],
  });
  if (error) console.error(error);

  return { data, error };
};
