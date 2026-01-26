import {
  listInfo,
  listSongsSection,
  navbarList,
  SearchProfile,
} from "@/database/data";

export const generateValue = (
  isDataExist: navbarList,
  list: listInfo | SearchProfile | listSongsSection,
) => {
  if (isDataExist) {
    return { ...list, ...isDataExist };
  }
  return { ...list, source: "none" };
};
