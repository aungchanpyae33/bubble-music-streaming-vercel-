import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { createClient } from "./server";
import { Database } from "../../database.types";
export interface Movie {
  id: number;
  name: string;
}
export interface MovieRe {
  title: string;
}

export interface getProps {
  id: string;
  name: string;
  related_id: string;
  related_name: string;
  source: Database["public"]["Enums"]["media_source_type"];
  type: Database["public"]["Enums"]["media_item_type"];
}

export interface getPropItem {
  data: {
    id: string;
    name: any;
  } | null;
  error: PostgrestError | null;
}

export interface artists {
  id: string;
  name: string;
  role: string;
}
interface album {
  id: string;
  name: string;
}
export interface song {
  id: string;
  uni_id: string;
  name: string;
  url: string;
  sege: number;
  duration: number;
  song_time_stamp: Array<number>;
  is_liked: boolean;
  artists: artists[];
  album: album;
}

export interface getSongsReturn {
  id: string;
  name: string;
  related_id: string;
  related_name: string;
  might_repeat?: boolean;
  source: "create" | "reference" | "none";
  type: "playlist" | "album" | "artist";
  songs: song[];
}

export interface getLikeSongsReturn {
  songs: song[][];
}

export const getLike = async (id: string) => {
  const { data, error } = await supabase.rpc("get_songs_with_likes", {
    current_user_id: id,
  });
  if (error) console.error(error);
  else console.log(data);
};

// export const getLikeSongs = async (
//   userId: string
// ): Promise<getLikeSongsReturn["songs"]> => {
//   let { data, error } = await supabase.rpc("get_liked_songs", {
//     current_user_id: userId,
//   });
//   if (error) console.error(error);
//   const chunkData = chunkArray(data, 4) as song[][];
//   return chunkData;
// };
export const get = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_all_media_items");

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getRecent = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("recently_played_playlists")
      .select("playlist_id,playlist_name");
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
export const getUserPlaylist = async () => {
  try {
    const supabase = await createClient();
    let { data: songs, error } = await supabase.rpc("get_user_library");

    return { data: songs, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getSearchSong = async (query: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_similar_songs_text", {
      input_song_text: query,
      similarity_threshold: 0.2,
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

export const getPlaylistSongs = async (playlistId: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase.rpc("get_playlist_songs", {
      p_id: playlistId,
    })) as { data: getSongsReturn[] | null; error: any };
    console.log(data, error);
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getAlbumSongs = async (albumId: string) => {
  try {
    const supabase = await createClient();
    let { data, error } = (await supabase.rpc("get_album_songs_with_artists", {
      p_album_id: albumId,
    })) as { data: getSongsReturn[] | null; error: any };
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const test = async () => {
  const { data, error } = await supabase.from("song").select("");

  return { data, error };
};
