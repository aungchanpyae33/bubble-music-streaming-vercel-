import NavList from "./NavList";
import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import { Compass, ListMusic, Radio } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

import { getUserPlaylist } from "@/database/data";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function NavSideBar() {
  const deviceFromUserAgent = await DeviceCheck();
  const queryClient = new QueryClient();
  const { data, error } = await queryClient.fetchQuery({
    queryKey: ["user-library"],
    queryFn: getUserPlaylist,
  });
  if (!data || error) return null;

  return (
    <>
      <div
        className={clsx("w-[70px]   bg-[#0A0A0A] ", {
          hidden: deviceFromUserAgent !== "desktop",
        })}
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NavList
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
      <div
        className={clsx("", {
          "w-[16px] h-1": deviceFromUserAgent !== "desktop",
        })}
      ></div>
    </>
  );
}

export default NavSideBar;
