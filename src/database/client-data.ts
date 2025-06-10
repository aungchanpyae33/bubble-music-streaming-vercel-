import { supabase } from "./supabase";

export const getData = async (query: string) => {
  try {
    const { data, error } = await supabase.rpc("search_songs", {
      query,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
