import React, { SetStateAction } from "react";
import NavSideLink from "./NavSideLink";
import IconWrapper from "../general/IconWrapper";
import { ListMusic } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import PlaylistAdd from "./PlaylistAdd";
import { getUserLibClient } from "@/database/client-data";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

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
  if (!data || error) return;
  const { userLib } = data;
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
      {userLib.idArray.length > 0 &&
        userLib.idArray.map((id) => {
          const item = userLib[id];
          return (
            <NoThankYouPreFetchLink
              href={`/${item.type}/${item.id}`}
              className=" mt-2  h-[50px] hover:bg-[#333333] leading-relaxed  flex items-center"
              key={item.id}
              onClick={() => setOpen(false)}
            >
              <div className="w-[70px]  cursor-pointer text-center">icon</div>
              <div className=" flex-1  truncate pr-2">{item.name}</div>
            </NoThankYouPreFetchLink>
          );
        })}
    </div>
  );
}

export default PlaylistFolderContainer;
