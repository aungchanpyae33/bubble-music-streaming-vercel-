import React, { SetStateAction } from "react";
import NavSideLink from "./NavSideLink";
import IconWrapper from "../general/IconWrapper";
import { ListMusic } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import PlaylistAdd from "./PlaylistAdd";
import { getUserLibClient } from "@/database/client-data";

function PlaylistFolderContainer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  const { data, error } = queryData || {};
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
        <PlaylistAdd />
      </div>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <Link
            href={`/${item.type}/${item.id}`}
            className=" mt-2  h-[50px] hover:bg-[#333333] leading-relaxed  flex items-center"
            key={item.id}
            onClick={() => setOpen(false)}
          >
            <div className="w-[70px]  cursor-pointer text-center">icon</div>
            <div className=" flex-1  truncate pr-2">{item.name}</div>
          </Link>
        ))}
    </div>
  );
}

export default PlaylistFolderContainer;
