import {
  listInfo,
  listSongsSection,
  navbarList,
  SearchProfile,
} from "@/database/data";
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
  isDataExist: navbarList,
  list: listInfo | SearchProfile | listSongsSection
) => {
  if (isDataExist) {
    return { ...list, ...isDataExist };
  }
  return { ...list, source: "none" };
};
