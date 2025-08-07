"use server";

import { getSongsReturn, UserLibMappedProps } from "@/database/data";
import { createClient } from "@/database/server";
import { deepMapById } from "@/lib/returnById";

export const addToLibrary = async (
  id: string,
  type: getSongsReturn["type"]
): Promise<{
  data: UserLibMappedProps | null;
  error: any;
}> => {
  try {
    const supabase = await createClient();
    let { data, error } = await supabase.rpc("add_to_library", {
      p_item_id: id,
      p_item_type: type,
    });
    const userLib = {
      userLib: data,
    };
    const mappedData = deepMapById(userLib, ["userLib"]);
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};
