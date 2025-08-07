import { SongListContextProps } from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { Database } from "../../database.types";

interface generateValueProps {
  id: string;
  name: string;
  related_id: string;
  related_name: string;
  source: Database["public"]["Enums"]["media_source_type"];
  type: Database["public"]["Enums"]["media_item_type"];
}
export const generateValue = (
  isDataExist: generateValueProps,
  defaultValue: SongListContextProps,
  isPage: boolean | undefined
) => {
  if (isDataExist) {
    const { id, name, type, source } = isDataExist;
    return { id, name, type, source, isPage };
  }
  return defaultValue;
};
