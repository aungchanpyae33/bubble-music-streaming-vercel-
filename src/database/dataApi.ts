import { getSongsReturn } from "./data";

export const fetcher = async (
  playlist_id: string
): Promise<getSongsReturn | null> => {
  const fetchData = await fetch(`/api/playlist/${playlist_id}`);
  return await fetchData.json();
};
