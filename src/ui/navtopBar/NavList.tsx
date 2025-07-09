"use client";
import OverLay from "./OverLay";
import NavSideLink from "./NavSideLink";
import { ReactNode, useState } from "react";
import NavListUlWrapper from "./NavListUlWrapper";
import { Menu } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import PlaylistFolderContainer from "./PlaylistFolderContainer";
import { getProps } from "@/database/data";
import NavSideLinkNotOpen from "./NavSideLinkNotOpen";
interface childrenProp {
  childrenExplore: ReactNode;
  childrenLive: ReactNode;
  childrenPlaylist: ReactNode;
  songs: getProps[] | null;
}
function NavList({
  childrenExplore,
  childrenLive,
  childrenPlaylist,
  songs,
}: childrenProp) {
  // console.log("render");
  const [open, setOpen] = useState(false);
  return (
    <div className=" w-full ">
      <ul className="fixed w-[70px]  top-0  box-border left-0 h-[70px] md:h-full flex  flex-col gap-x-1   rounded-b-sm">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          tabIndex={open ? -1 : 0}
          className=" w-[70px]  cursor-pointer border-none  h-[70px] min-h-[70px]  flex items-center justify-center "
        >
          {/* open */}
          <IconWrapper size="large" Icon={Menu} />
        </button>

        <div className=" h-full border-r border-opacity-15    border-neutral-200">
          <NavSideLinkNotOpen hrefString="/explore">
            {childrenExplore}
          </NavSideLinkNotOpen>
          <NavSideLinkNotOpen hrefString="/live">
            {childrenLive}
          </NavSideLinkNotOpen>

          <NavSideLinkNotOpen hrefString="/library">
            {childrenPlaylist}
          </NavSideLinkNotOpen>
        </div>
      </ul>

      <NavListUlWrapper open={open} setOpen={setOpen}>
        <div className="overflow-auto   py-3">
          <NavSideLink
            url="/explore"
            icon="icon"
            desp="စုံလင်စွာရှာဖွေရန်"
            open={open}
            setOpen={setOpen}
          >
            {childrenExplore}
          </NavSideLink>
          <NavSideLink
            url="/live"
            icon="icon"
            desp="တိုက်ရိုက်လိုက်ဖ်"
            open={open}
            setOpen={setOpen}
          >
            {childrenLive}
          </NavSideLink>
          <PlaylistFolderContainer
            open={open}
            setOpen={setOpen}
            songs={songs}
          />
        </div>
      </NavListUlWrapper>

      {open && <OverLay setOpen={setOpen} className="bg-black/50" />}
    </div>
  );
}

export default NavList;
