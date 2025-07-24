"use client";
import AddSongItem from "./AddSongItem";
import { useQuery } from "@tanstack/react-query";
import { getUserLibClient } from "@/database/client-data";
function AddSongContent() {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  const { data, error } = queryData || {};
  console.log(data, error);
  return (
    <>
      Add songs to playlist
      {data &&
        data.length > 0 &&
        data.map((item) => <AddSongItem key={item.id} playlistSongs={item} />)}
    </>
  );
}

export default AddSongContent;
