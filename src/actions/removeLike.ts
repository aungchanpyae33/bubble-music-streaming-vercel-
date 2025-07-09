"use server";

import { createClient } from "@/database/server";
import { redirect } from "next/navigation";

export const removeLike = async (userId: string | null, songId: number) => {
  if (!userId) {
    redirect("/login");
  }
  const supabase = await createClient();
  const { error } = await supabase.rpc("removelike", {
    song_id: songId,
  });
  console.log(error);
  return { error };
};
