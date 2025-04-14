import React, { SetStateAction, useActionState, useEffect } from "react";
import NavSideLink from "./NavSideLink";
import IconWrapper from "../general/IconWrapper";
import { ListMusic } from "lucide-react";
import PlaylistAdd from "./PlaylistAdd";
import { insertDataAction } from "@/actions/createPlaylist";
import { songsProp } from "./NavList";

function PlaylistFolderContainer({
  open,
  setOpen,
  songs,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  songs: songsProp["songs"];
}) {
  const [state, formAction, isPending] = useActionState(insertDataAction, {
    data: songs!,
    error: null,
  });
  console.log("why", state);
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
        <PlaylistAdd
          formAction={formAction}
          isPending={isPending}
          state={state}
        />
      </div>
      {state.data &&
        state.data.map((item, index) => (
          <div
            className=" mt-2  h-[50px] hover:bg-[#333333] leading-relaxed  flex items-center"
            key={index}
          >
            <div className="w-[70px]  cursor-pointer text-center  ">icon</div>
            <div className=" flex-1  truncate pr-2">{item.title}</div>
          </div>
        ))}
    </div>
  );
}

export default PlaylistFolderContainer;
