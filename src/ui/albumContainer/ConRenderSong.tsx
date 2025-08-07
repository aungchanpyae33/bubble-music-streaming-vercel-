"use client";
import { ReactNode, useContext } from "react";
import { SongsDataContext } from "./ContextSongsData";
function ConRenderSong({
  container,
  empty,
}: {
  container: ReactNode;
  empty: ReactNode;
}) {
  const { songsData } = useContext(SongsDataContext);
  // console.log(songsData);

  return songsData && songsData.idArray.length > 0 ? container : empty;
}

export default ConRenderSong;
