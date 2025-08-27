"use server";
import { createClient } from "@/database/server";
export const addRecentlySong = async (id: string) => {
  try {
    const now = new Date().toISOString();
    const addDateList = { id, played_at: now };
    const supabase = await createClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    const { data: userData } = await supabase.auth.getClaims();
    const userId = userData?.claims.sub;
    const fetchData = await fetch(
      `https://api.bubblemusic.dpdns.org/playSong/${userId}`,
      {
        method: "POST",
        body: JSON.stringify(addDateList),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const { error } = await fetchData.json();
    return { error };
  } catch (error) {
    return { error };
  }
};
