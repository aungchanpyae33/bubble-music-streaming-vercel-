"use server";

import { createClient } from "@/database/server";
import { PostgrestError } from "@supabase/supabase-js";
import { getRecentReturn, listInfo } from "@/database/data";
import { deepMapById } from "@/lib/returnById";

export const addRecentlyPlayedList = async (
  list: listInfo
): Promise<{
  data: getRecentReturn | null;
  error: PostgrestError | null | any;
}> => {
  try {
    const now = new Date().toISOString();
    const addDateList = { ...list, played_at: now };
    const supabase = await createClient();
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    const { data: userData } = await supabase.auth.getClaims();
    const userId = userData?.claims.sub;
    const fetchData = await fetch(
      `https://api.bubblemusic.dpdns.org/play/${userId}`,
      {
        method: "POST",
        body: JSON.stringify(addDateList),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { data, error } = await fetchData.json();
    if ("recentlyPlayed" in data) {
      const mappedData = data ? deepMapById(data, ["recentlyPlayed"]) : null;

      return { data: mappedData["recentlyPlayed"], error };
    }
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
