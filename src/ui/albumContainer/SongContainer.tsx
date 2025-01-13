"use client";
import { currentSongPlaylistAction, useCurrentPlayList } from "@/lib/zustand";
import { ReactNode, useEffect } from "react";
import type { urlProp } from "./AudiosContainer";

function SongContainer({
  children,
  url,
}: {
  children: ReactNode;
  url: urlProp[];
}) {
  // const setPlayListArray = useCurrentPlayList(
  //   (state: currentSongPlaylistAction) => state.setPlayListArray
  // );
  // // should run only click play button // but need to test it can overload ?

  // useEffect(() => {
  //   setPlayListArray(url);
  // }, [setPlayListArray, url]);
  return <tbody className=" ">{children}</tbody>;
}

export default SongContainer;
