import React, { SetStateAction, useEffect, useState } from "react";
import NavSideLink from "./NavSideLink";
import IconWrapper from "../general/IconWrapper";
import { ListMusic } from "lucide-react";
import PlaylistAdd from "./PlaylistAdd";
import { getProps } from "@/database/data";
import Link from "next/link";
import { setPlaylistFolderAction, usePlaylistFolder } from "@/lib/zustand";

function PlaylistFolderContainer({
  open,
  setOpen,
  songs,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  songs: getProps[] | null;
}) {
  const [songsData, setSongsData] = useState(songs!);
  const setPlaylistFolder = usePlaylistFolder(
    (state: setPlaylistFolderAction) => state.setPlaylistFolder
  );

  useEffect(() => {
    setPlaylistFolder(songs!);
  }, [setPlaylistFolder, songs]);

  return (
    <div>
      <div className=" border-t-2  border-black  h-[50px] flex items-center justify-between  ">
        <NavSideLink
          url="/library"
          icon="icon"
          desp=""
          open={open}
          setOpen={setOpen}
        >
          <div className=" w-[70px] flex items-center  justify-center">
            <IconWrapper size="large" Icon={ListMusic} />
          </div>
        </NavSideLink>
        <PlaylistAdd setSongsData={setSongsData} />
      </div>
      {songsData &&
        songsData &&
        songsData.map((item) => (
          <Link
            href={`/playlist/${item.id}`}
            className=" mt-2  h-[50px] hover:bg-[#333333] leading-relaxed  flex items-center"
            key={item.id}
          >
            <div className="w-[70px]  cursor-pointer text-center">icon</div>
            <div className=" flex-1  truncate pr-2">{item.name}</div>
          </Link>
        ))}
    </div>
  );
}

export default PlaylistFolderContainer;
