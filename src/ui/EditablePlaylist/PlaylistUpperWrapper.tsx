"use client";

import { useTranslations } from "next-intl";
import ListUpperContainer from "../ListContainer/ListUpperContainer";
import { useDeviceContext } from "@/Context/ContextDeviceCheck";
import { useSongsDataContext } from "@/Context/ContextSongsData";

function PlaylistUpperWrapper() {
  const l = useTranslations("ListTitle");
  const { device } = useDeviceContext();
  const { songsData } = useSongsDataContext();
  if (!songsData) return;
  return <ListUpperContainer l={l} device={device} list={songsData} />;
}

export default PlaylistUpperWrapper;
