import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "../../database.types";
import { getSongsReturn, getUserLibraryReturn } from "./data";

export const getPlaylistSongsApi = async (
  playlist_id: string
): Promise<{
  data: getSongsReturn[] | null;
  error: any;
}> => {
  try {
    const res = await fetch(`/api/playlist/${playlist_id}`);
    if (res.status !== 200) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch playlist songs");
    }
    const { data, error } = await res.json();
    return { data, error };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch user-library"
    );
  }
};

export const getUserLibraryApi = async (): Promise<
  | {
      data:
        | {
            id: string;
            name: string;
            related_id: string;
            related_name: string;
            source: Database["public"]["Enums"]["media_source_type"];
            type: Database["public"]["Enums"]["media_item_type"];
          }[]
        | null;
      error: PostgrestError | null;
    }
  | undefined
> => {
  try {
    const res = await fetch(`/api/library`);
    if (res.status !== 200) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch user-library");
    }
    const { data, error } = await res.json();
    return { data, error };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch user-library"
    );
  }
};
