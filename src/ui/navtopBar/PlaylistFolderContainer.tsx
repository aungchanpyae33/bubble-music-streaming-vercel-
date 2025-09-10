import React, { SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserLibClient } from "@/database/client-data";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import Image from "next/image";
import IconWrapper from "../general/IconWrapper";
import { Folder } from "lucide-react";

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
  if (!data || error || queryError) return;
  const { userLib } = data;
  return (
    <div>
      {userLib.idArray.length > 0 &&
        userLib.idArray.map((id) => {
          const item = userLib[id];
          return (
            <div key={item.id} className="p-2 hover:bg-[#333333] ">
              <NoThankYouPreFetchLink
                href={`/${item.type}/${item.id}`}
                className=" h-[50px] leading-relaxed  flex items-center gap-x-2"
                onClick={() => setOpen(false)}
              >
                <div className="size-[50px] bg-[#333333] relative  cursor-pointer">
                  {item.cover_url ? (
                    <Image src={item.cover_url} fill alt="image" sizes="50px" />
                  ) : item.type === "playlist" ? (
                    <div className=" absolute inset-0 flex items-center justify-center">
                      <IconWrapper
                        Icon={Folder}
                        className="hover:scale-100   active:scale-100 size-[30px]"
                      />
                    </div>
                  ) : null}
                </div>
                <div className=" flex-1  truncate pr-2">{item.name}</div>
              </NoThankYouPreFetchLink>
            </div>
          );
        })}
    </div>
  );
}

export default PlaylistFolderContainer;
