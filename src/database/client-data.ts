import { getSongsReturn } from "./data";
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

export const getPlaylistSongsClient = async (playlistId: string) => {
  try {
    const { data, error } = (await supabase.rpc("get_playlist_songs", {
      p_id: playlistId,
    })) as { data: getSongsReturn[] | null; error: any };

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getUserLibClient = async () => {
  try {
    let { data: songs, error } = await supabase.rpc("get_user_library");

    return { data: songs, error };
  } catch (error) {
    return { data: null, error };
  }
};
