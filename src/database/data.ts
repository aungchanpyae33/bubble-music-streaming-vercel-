import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "./server";
import { Database } from "../../database.types";
import { deepMapById } from "@/lib/returnById";
export interface Movie {
  id: number;
  name: string;
}
export interface MovieRe {
  title: string;
}

export interface listInfo {
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
  song_id: string;
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
  type: "playlist" | "album" | "artist" | "track";
  songs: song[];
}

export interface getUserLibraryReturn {
  id: string;
  name: string;
  related_id: string;
  related_name: string;
  source: Database["public"]["Enums"]["media_source_type"];
  type: Database["public"]["Enums"]["media_item_type"];
}

export interface getLikeSongsReturn {
  songs: song[][];
}

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

export interface getDataProps {
  getAllTest: Record<string, listInfo> & { idArray: string[] };
}

export const get = async (): Promise<{
  data: getDataProps | null;
  error: PostgrestError | null | any;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_all_media_items");
    const getAllTest = {
      getAllTest: data,
    };
    const mappedData = data ? deepMapById(getAllTest, ["getAllTest"]) : null;

    return { data: mappedData, error };
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

export interface UserLibMappedProps {
  userLib: Record<string, listInfo> & { idArray: string[] };
}

export const getUserLib = async (): Promise<{
  data: UserLibMappedProps | null;
  error: any;
}> => {
  try {
    const supabase = await createClient();
    let { data, error } = await supabase.rpc("get_user_library");
    const userLib = {
      userLib: data,
    };
    const mappedData = deepMapById(userLib, ["userLib"]);
    return { data: mappedData, error };
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

export const getSearchPage = async (query: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("search_dropdown", {
      query,
    });
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

export interface getPlaylistPageProps {
  songs: listSongsSection | null;
}
export const getPlaylistSongs = async (
  playlistId: string
): Promise<{
  data: getPlaylistPageProps | null;
  error: PostgrestError | any | null;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase.rpc("get_playlist_page", {
      p_id: playlistId,
    })) as { data: getPlaylistPageProps | null; error: PostgrestError | null };
    console.log(data, error);
    const mappedData = data ? deepMapById(data, ["songs.songs"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getSongTrack = async (songId: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_song_track", {
      p_song_id: songId,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface getAlbumPageProps {
  songs: listSongsSection | null;
}

export const getAlbumSongs = async (
  albumId: string
): Promise<{
  data: getAlbumPageProps | null;
  error: PostgrestError | any | null;
}> => {
  try {
    const supabase = await createClient();
    let { data, error } = await supabase.rpc("get_album_page", {
      p_album_id: albumId,
    });

    const mappedData = data ? deepMapById(data, ["songs.songs"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface listSongsSection extends listInfo {
  idArray: string[];
  songs: Record<string, SongInfo>;
  is_official: boolean;
}

export interface SongInfo {
  id: string;
  song_id: string;
  name: string;
  url: string;
  sege: number;
  duration: number;
  song_time_stamp: number[];
  is_liked: boolean;
  artists: Artist[];
  album: Album;
}

export interface Artist {
  id: string;
  name: string;
  role: string;
}

export interface Album {
  id: string;
  name: string;
}

export interface getArtistPageProps {
  songs: listSongsSection | null;
  albums: (Record<string, listInfo> & { idArray: string[] }) | null;
}
export const getArtistPage = async (
  artistId: string
): Promise<{
  data: getArtistPageProps | null;
  error: PostgrestError | null | any;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase.rpc("get_artist_page", {
      p_artist_id: artistId,
    })) as { data: getArtistPageProps | null; error: PostgrestError | null };
    const mappedData = deepMapById(data, ["albums", "songs.songs"]);
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};
