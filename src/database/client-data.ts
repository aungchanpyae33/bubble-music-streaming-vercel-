import { RefObject } from "react";
import {
  getLikedIdReturn,
  getListDirectProps,
  getLyricReturn,
  getPlaylistPageProps,
  getRecentReturn,
  getSongListProps,
  UserLibMappedProps,
} from "./data";
import type { PostgrestError } from "@supabase/supabase-js";
import { Database } from "../../database.types";

export const getListDirectClient = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"]
): Promise<{
  data: getListDirectProps | null;
  error: PostgrestError | unknown | null;
}> => {
  const params = new URLSearchParams({
    id,
    type,
  });
  try {
    const fetchData = await fetch(`/api/getListDirect?${params}`);
    const { data, error } = await fetchData.json();
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getUserLibClient = async (): Promise<{
  data: UserLibMappedProps | null;
  error: unknown;
}> => {
  try {
    const fetchData = await fetch("/api/getLib");
    const { data, error } = await fetchData.json();
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getLikedIdClient = async (): Promise<{
  data: getLikedIdReturn | null;
  error: unknown;
}> => {
  try {
    const fetchData = await fetch("/api/getLike");
    const { data, error } = await fetchData.json();
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getRecentClient = async (): Promise<
  getRecentReturn["recentlyPlayed"]
> => {
  try {
    const fetchData = await fetch("/api/getRecent");
    const { data, error } = await fetchData.json();
    if (error || !data) throw error;
    if ("recentlyPlayed" in data) {
      return data["recentlyPlayed"];
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPlaylistSongsClient = async (
  playlistId: string
): Promise<{
  data: getPlaylistPageProps | null;
  error: PostgrestError | unknown | null;
}> => {
  const params = new URLSearchParams({
    id: playlistId,
  });
  try {
    const fetchData = await fetch(`/api/getPlaylist?${params}`);
    const { data, error } = await fetchData.json();
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
export const getSimilarSongQueueClient = async (
  id: string,
  abortController: RefObject<AbortController | null>
): Promise<{
  data: getSongListProps | null;
  error: PostgrestError | unknown | null;
}> => {
  const params = new URLSearchParams({
    songId: id,
  });
  const signal = abortController!.current!.signal;
  try {
    const fetchData = await fetch(`/api/getSimilarSong?${params}`, {
      signal,
    });
    const { data, error } = await fetchData.json();
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

// for queue case

export const getSongListClient = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"]
): Promise<{
  data: getSongListProps | null;
  error: PostgrestError | unknown | null;
}> => {
  const params = new URLSearchParams({
    id,
    type,
  });
  try {
    const fetchData = await fetch(`/api/fetchSongList?${params}`);
    const { data, error } = await fetchData.json();
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const checkSongsBeforeAddClient = async ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}) => {
  const params = new URLSearchParams({
    playlistId,
    songId,
  });
  try {
    const fetchData = await fetch(`/api/checkBeforeAdd?${params}`);
    const { exists, error } = await fetchData.json();
    return { exists, error };
  } catch (error) {
    return { exists: false, error };
  }
};

export const getLyricClient = async (
  songId: string
): Promise<{
  data: getLyricReturn | null;
  error: PostgrestError | unknown | null;
}> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const params = new URLSearchParams({
    id: songId,
  });
  try {
    const fetchData = await fetch(`/api/getLyric?${params}`);
    const { data, error } = await fetchData.json();

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
