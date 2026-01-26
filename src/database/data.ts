import type { PostgrestError } from "@supabase/supabase-js";
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
  type: Database["public"]["Enums"]["media_item_type"];
  is_official?: boolean;
  cover_url: string | null;
}

export interface listInfoUserLib extends listInfo {
  source: Database["public"]["Enums"]["media_source_type"];
}

// export const getLikeSongs = async (
//   userId: string
// ): Promise<getLikeSongsReturn["songs"]> => {
//   const { data, error } = await supabase.rpc("get_liked_songs", {
//     current_user_id: userId,
//   });
//   if (error) console.error(error);
//   const chunkData = chunkArray(data, 4) as song[][];
//   return chunkData;
// };
export interface getLikedIdReturn {
  userLike: Record<string, string> & { idArray: string[] };
}
export const getLikedId = async (): Promise<{
  data: getLikedIdReturn | null;
  error: PostgrestError | null | unknown;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("getlikedid");
    const userLike = {
      userLike: data,
    };
    const mappedData = deepMapById(userLike, ["userLike"]);

    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface getDataProps {
  [key: string]: Record<string, listInfo | SongInfo> & { idArray: string[] };
}

export const get = async (): Promise<{
  data: getDataProps | null;
  error: PostgrestError | null | unknown;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase.rpc("get_all_media_items")) as {
      data: Record<string, unknown>;
      error: PostgrestError | null;
    };
    const keys = Object.keys(data);
    const mappedData = data ? deepMapById(data, keys) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

// export const getRecent = async () => {
//   try {
//     const supabase = await createClient();
//     const { data, error } = await supabase
//       .from("recently_played_playlists")
//       .select("playlist_id,playlist_name");
//     return { data, error };
//   } catch (error) {
//     return { data: null, error };
//   }
// };

export interface getRecentReturn {
  recentlyPlayed: Record<string, listInfo> & { idArray: string[] };
}

export const getRecent = async (): Promise<{
  data: getRecentReturn | null;
  error: PostgrestError | null | unknown;
}> => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_recent_list");
    if (!data || error) throw "no data";
    const mappedData = data ? deepMapById(data, ["recentlyPlayed"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface navbarList extends listInfoUserLib {
  is_public: boolean;
}
export interface UserLibMappedProps {
  userLib: Record<string, navbarList> & { idArray: string[] };
}

export const getUserLib = async (): Promise<{
  data: UserLibMappedProps | null;
  error: unknown;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_user_library");
    const userLib = {
      userLib: data,
    };

    const mappedData = deepMapById(userLib, ["userLib"]);
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface SearchProfile {
  id: string;
  name: string;
  is_official?: boolean;
  type: Database["public"]["Enums"]["media_item_type"];
  cover_url: string;
}

export interface getSearchPageReturn {
  songs: (Record<string, SongInfo> & { idArray: string[] }) | null;
  albums: (Record<string, listInfo> & { idArray: string[] }) | null;
  artists: (Record<string, listInfo> & { idArray: string[] }) | null;
  playlists: (Record<string, listInfo> & { idArray: string[] }) | null;
  profiles: (Record<string, SearchProfile> & { idArray: string[] }) | null;
  top_result: SongInfo | listInfo | SearchProfile | null;
}

export const getSearchPage = async (
  query: string,
): Promise<{
  data: getSearchPageReturn | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("search_dropdown", {
      query,
    });
    if (!data) throw "no data";
    const keys = Object.keys(data);
    const mappedData = data ? deepMapById(data, keys) : null;

    return { data: mappedData, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

export interface getPlaylistPageProps {
  songs: listSongsSection | null;
}
export const getPlaylistSongs = async (
  playlistId: string,
): Promise<{
  data: getPlaylistPageProps | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase.rpc("get_playlist_page", {
      p_id: playlistId,
    })) as { data: getPlaylistPageProps | null; error: PostgrestError | null };

    const mappedData = data ? deepMapById(data, ["songs.songs"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface getSongTrackReturnType {
  songs: listSongsSection | null;
}

export const getSongTrack = async (
  songId: string,
): Promise<{
  data: getSongTrackReturnType | null;
  error: PostgrestError | null | unknown;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase.rpc("get_song_track", {
      p_song_id: songId,
    })) as {
      data: getSongTrackReturnType | null;
      error: PostgrestError | null | unknown;
    };
    const mappedData = data ? deepMapById(data, ["songs.songs"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface getAlbumPageProps {
  songs: listSongsSection | null;
}

export const getAlbumSongs = async (
  albumId: string,
): Promise<{
  data: getAlbumPageProps | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_album_page", {
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
  is_official?: boolean;
}

export interface SongInfo {
  id: string;
  song_id: string;
  name: string;
  url: string;
  sege: number;
  duration: number;
  is_lyric: boolean;
  type?: "track";
  song_time_stamp: number[];
  artists: Artist[];
  album: Album;
  cover_url: string;
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
  artistId: string,
): Promise<{
  data: getArtistPageProps | null;
  error: PostgrestError | null | unknown;
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

export const getData = async (query: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("search_all", {
      query,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface getUserPageProps {
  profile: listInfo | null;
  playlists: (Record<string, listInfo> & { idArray: string[] }) | null;
}
export const getUserPage = async (
  userId: string,
): Promise<{
  data: getUserPageProps | null;
  error: PostgrestError | null | unknown;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase.rpc("get_user_page", {
      p_user_id: userId,
    })) as { data: getUserPageProps | null; error: PostgrestError | null };
    const mappedData = deepMapById(data, ["playlists"]);
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface getSongListProps {
  songs: Record<string, SongInfo> & { idArray: string[] };
}

const fetchSongListByType = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
) => {
  try {
    const supabase = await createClient();
    if (type === "playlist") {
      return await supabase.rpc("get_playlist_songs_queue", {
        p_id: id,
      });
    } else if (type === "album") {
      return await supabase.rpc("get_album_songs_queue", {
        p_album_id: id,
      });
    } else if (type === "artist") {
      return await supabase.rpc("get_artist_songs_queue", {
        p_artist_id: id,
      });
    } else {
      return { data: null, error: null };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export const getSongList = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
): Promise<{
  data: getSongListProps | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const { data, error } = (await fetchSongListByType(id, type)) as {
      data: SongInfo | null;
      error: PostgrestError | null;
    };
    const listQueue = {
      songs: data,
    };
    const mappedData = data ? deepMapById(listQueue, ["songs"]) : null;

    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export interface getListDirectProps {
  songs: listSongsSection | null;
}

const fetchListDirectByType = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
) => {
  try {
    const supabase = await createClient();
    if (type === "playlist") {
      return await supabase.rpc("get_playlist_direct", {
        p_id: id,
      });
    } else if (type === "album") {
      return await supabase.rpc("get_album_direct", {
        p_album_id: id,
      });
    } else if (type === "artist") {
      return await supabase.rpc("get_artist_direct", {
        p_artist_id: id,
      });
    } else {
      return { data: null, error: null };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export const getListDirect = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
): Promise<{
  data: getListDirectProps | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const { data, error } = (await fetchListDirectByType(id, type)) as {
      data: getListDirectProps | null;
      error: PostgrestError | null;
    };
    const mappedData = data ? deepMapById(data, ["songs.songs"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const checkSongsBeforeAdd = async (
  playlistId: string,
  songId: string,
) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("playlist_songs")
      .select("id")
      .eq("playlist_id", playlistId)
      .eq("song_id", songId);
    if (error) {
      console.error("Error checking playlist:", error);
      return { exists: false, error };
    }
    if (data && data.length > 0) {
      // true if song already in playlist
      return { exists: true, error: null };
    }
    return { exists: false, error: null };
  } catch (error) {
    return { exists: false, error };
  }
};

export const getSimilarSongQueue = async (
  id: string,
): Promise<{
  data: getSongListProps | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_similar_songs", {
      input_song_id: id,
      similarity_threshold: 0.3,
    });
    const listQueue = {
      songs: data,
    };

    const mappedData = data ? deepMapById(listQueue, ["songs"]) : null;
    return { data: mappedData, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

export interface getLyricReturn {
  song_id: string;
  lyric_data: {
    time: number;
    line: string;
  }[];
}

export const getLyric = async (
  songId: string,
): Promise<{
  data: getLyricReturn | null;
  error: PostgrestError | unknown | null;
}> => {
  try {
    const supabase = await createClient();
    const { data, error } = (await supabase
      .from("lyric")
      .select("*")
      .eq("song_id", songId)
      .maybeSingle()) as {
      data: getLyricReturn | null;
      error: PostgrestError | null;
    };
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
