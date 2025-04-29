"use server";

import { createClient } from "@/database/server";

export const insertDataAction = async (queryData: FormData) => {
  const supabase = await createClient();
  const playlistname = queryData.get("playlistname");
  let { data, error } = await supabase.rpc("insert_playlist", {
    playlist_name: playlistname,
  });
  if (error) console.error(error);
  else console.log(data);
  return { data, error };
};
