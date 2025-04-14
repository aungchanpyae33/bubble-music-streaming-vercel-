"use server";

import { supabase } from "@/database/supabase";

export const insertDataAction = async (prevState: any, queryData: FormData) => {
  const playlistname = queryData.get("playlistname");
  const { data: song, error } = await supabase
    .from("song")
    .insert([{ title: playlistname }])
    .select("title");
  return {
    data: [...(prevState?.data || []), ...(song || [])],
    error,
  };
};
