"use server";
import { createClient } from "@/database/server";
import { redirect } from "next/navigation";

export const addLike = async (userId: string | null, songId: number) => {
  if (!userId) {
    redirect("/login");
  }
  const supabase = await createClient();
  const { error } = await supabase.rpc("addlike", {
    song_id: songId,
  });
  return { error };
};
