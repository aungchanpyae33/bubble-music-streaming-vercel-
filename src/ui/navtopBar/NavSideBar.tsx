import NavList from "./NavList";
import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import { Compass, ListMusic, Radio } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

import { getLikedId, getUserLib } from "@/database/data";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Logo from "../icon/Logo";

async function NavSideBar() {
  const deviceFromUserAgent = await DeviceCheck();
  const queryClient = new QueryClient();
  await Promise.all([
    await queryClient.prefetchQuery({
      queryKey: ["user-library"],
      queryFn: getUserLib,
      gcTime: Infinity,
    }),
    await queryClient.prefetchQuery({
      queryKey: ["liked-id"],
      queryFn: getLikedId,
      gcTime: Infinity,
    }),
  ]);

  // if (!data || error) return null;
  // console.log(data, error);
  return (
    <div className="w-[70px] bg-[#0A0A0A]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NavList
          childrenLogo={<Logo width={90} height={70} />}
          childrenExplore={
            <div className=" w-[70px] max-w-[70px] h-[70px]   flex items-center justify-center     ">
              <IconWrapper size="large" Icon={Compass} />
            </div>
          }
          childrenLive={
            <div className=" w-[70px]  h-[70px]  flex items-center justify-center  ">
              <IconWrapper size="large" Icon={Radio} />
            </div>
          }
          childrenPlaylist={
            <div className=" w-[70px] h-[70px]  flex items-center justify-center  ">
              <IconWrapper size="large" Icon={ListMusic} />
            </div>
          }
        />
      </HydrationBoundary>
    </div>
  );
}

export default NavSideBar;
