"use server";

import { UserLibMappedProps } from "@/database/data";
import { createClient } from "@/database/server";
import { deepMapById } from "@/lib/returnById";

export const insertDataAction = async (
  playlist_name: string
): Promise<{
  data: UserLibMappedProps | null;
  error: any;
}> => {
  try {
    const supabase = await createClient();
    let { data, error } = await supabase.rpc("insert_playlist", {
      playlist_name,
    });
    const userLib = {
      userLib: data,
    };

    const mappedData = data ? deepMapById(userLib, ["userLib"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};
