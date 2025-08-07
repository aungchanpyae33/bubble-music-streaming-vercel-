"use client";
import { getUserLibClient } from "@/database/client-data";
import { generateValue } from "@/lib/generateValue";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { Database } from "../../../../database.types";

export interface SongListContextProps {
  id: string;
  name: string;
  source: Database["public"]["Enums"]["media_source_type"];
  type: Database["public"]["Enums"]["media_item_type"];
  isPage?: boolean | undefined;
}

// Default context value
export const SongListContext = createContext<SongListContextProps>({
  id: "",
  name: "",
  source: "none",
  type: "album",
  isPage: false,
});
interface ContextSongListContainerProps extends React.ComponentProps<"div"> {
  id: string;
  name: string;
  source: Database["public"]["Enums"]["media_source_type"];
  type: Database["public"]["Enums"]["media_item_type"];
  isPage?: boolean | undefined;
}
function ContextSongListContainer({
  children,
  id,
  source,
  type,
  name,
  isPage,
}: ContextSongListContainerProps) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  const { data, error } = queryData || {};
  if (!data || error) return;
  const { userLib } = data;
  const isDataExist = userLib[id];
  const defaultValue = { id, name, source, type, isPage };
  const value = generateValue(isDataExist, defaultValue, isPage);

  return (
    <SongListContext.Provider value={value}>
      {children}
    </SongListContext.Provider>
  );
}

export default ContextSongListContainer;
