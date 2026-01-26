"use server";
import { UserLibMappedProps } from "@/database/data";
import { createClient } from "@/database/server";
import { deepMapById } from "@/lib/returnById";

export const removeFromLibrary = async (
  id: string,
  source: "create" | "reference",
): Promise<{
  data: UserLibMappedProps | null;
  error: unknown;
}> => {
  try {
    const supabase = await createClient();
    if (source === "create") {
      const { data, error } = await supabase.rpc("delete_user_playlist_item", {
        p_item_id: id,
      });
      const userLib = {
        userLib: data,
      };
      const mappedData = deepMapById(userLib, ["userLib"]);
      return { data: mappedData, error };
    } else {
      const { data, error } = await supabase.rpc("delete_user_reference_item", {
        refer_item_id: id,
      });
      const userLib = {
        userLib: data,
      };
      const mappedData = deepMapById(userLib, ["userLib"]);
      return { data: mappedData, error };
    }
  } catch (error) {
    return { data: null, error };
  }
};
