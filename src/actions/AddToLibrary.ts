"use server";

import { listSongsSection, UserLibMappedProps } from "@/database/data";
import { createClient } from "@/database/server";
import { deepMapById } from "@/lib/returnById";

export const addToLibrary = async (
  id: string,
  type: listSongsSection["type"]
): Promise<{
  data: UserLibMappedProps | null;
  error: unknown;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("add_to_library", {
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
