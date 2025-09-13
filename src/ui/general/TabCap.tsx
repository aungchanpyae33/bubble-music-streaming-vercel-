"use client";

import { addSongAction, useSongsStoreData } from "@/lib/zustand";

function TabCap() {
  const addSong = useSongsStoreData((state) => state.addSong);

  return (
    <>
      <button className="absolute bottom-0 w-fit p-4 bg-red-500">hello</button>
    </>
  );
}

export default TabCap;
