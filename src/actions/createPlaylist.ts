"use server";

import { UserLibMappedProps } from "@/database/data";
import { createClient } from "@/database/server";
import { deepMapById } from "@/lib/returnById";

export const insertDataAction = async (
  playlist_name: string,
  check_type: boolean
): Promise<{
  data: UserLibMappedProps | null;
  error: unknown;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("insert_playlist", {
      playlist_name,
      check_type,
    });
    console.log(error);
    const userLib = {
      userLib: data,
    };

    const mappedData = data ? deepMapById(userLib, ["userLib"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};
