import { RefObject } from "react";
import {
  getPlaylistPageProps,
  song,
  SongInfo,
  UserLibMappedProps,
} from "./data";
import { supabase } from "./supabase";
import { deepMapById } from "@/lib/returnById";
import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "../../database.types";

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

export const getPlaylistSongsClient = async (
  playlistId: string
): Promise<{
  data: getPlaylistPageProps | null;
  error: PostgrestError | any | null;
}> => {
  try {
    const { data, error } = (await supabase.rpc("get_playlist_page", {
      p_id: playlistId,
    })) as {
      data: getPlaylistPageProps | null;
      error: PostgrestError | null;
    };
    console.log(data, error);
    console.log("some");
    const mappedData = data ? deepMapById(data, ["songs.songs"]) : null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getUserLibClient = async (): Promise<{
  data: UserLibMappedProps | null;
  error: any;
}> => {
  try {
    let { data, error } = await supabase.rpc("get_user_library");
    if (!data || error) throw error;
    const userLib = {
      userLib: data,
    };
    const mappedData = deepMapById(userLib, ["userLib"]) || null;
    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getSimilarSongQueue = async (
  id: string,
  abortController: RefObject<AbortController | null>
) => {
  try {
    const { data, error } = await supabase
      .rpc("get_similar_songs", {
        input_song_id: id,
        similarity_threshold: 0.3,
      })
      .abortSignal(abortController.current!.signal);
    return { data, error } as { data: song[] | null; error: any };
  } catch (err) {
    return { data: null, error: err };
  }
};

// for queue case
interface getSongListForQueueProps {
  songs: Record<string, SongInfo> & { idArray: string[] };
}

const fetchSongListByType = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"]
) => {
  if (type === "playlist") {
    return (await supabase.rpc("get_playlist_songs_queue", {
      p_id: id,
    })) as { data: SongInfo | null; error: PostgrestError | null };
  } else if (type === "album") {
    return (await supabase.rpc("get_album_songs_queue", {
      p_album_id: id,
    })) as { data: SongInfo | null; error: PostgrestError | null };
  } else if (type === "artist") {
    return (await supabase.rpc("get_artist_songs_queue", {
      p_artist_id: id,
    })) as { data: SongInfo | null; error: PostgrestError | null };
  } else {
    return { data: null, error: null };
  }
};

export const getSongListForQueue = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"]
): Promise<{
  data: getSongListForQueueProps | null;
  error: PostgrestError | any | null;
}> => {
  try {
    const { data, error } = await fetchSongListByType(id, type);
    const listQueue = {
      songs: data,
    };
    const mappedData = data ? deepMapById(listQueue, ["songs"]) : null;

    return { data: mappedData, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const checkSongsBeforeAdd = async ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}) => {
  console.log(playlistId, songId);
  const { data, error } = await supabase.from("playlist_songs").select("id");
  console.log(data, error);
  if (error) {
    console.error("Error checking playlist:", error);
    return { exists: false, error };
  }
  console.log(data, error);
  const exists = !!data; // true if song already in playlist
  return { exists };
};
