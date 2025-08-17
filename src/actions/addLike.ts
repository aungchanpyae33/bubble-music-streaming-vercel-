"use server";
import { createClient } from "@/database/server";
import { redirect } from "next/navigation";

export const addLike = async (songId: string) => {
  const supabase = await createClient();
  const { error } = await supabase.rpc("addlike", {
    song_id: songId,
  });
  return { error };
};
