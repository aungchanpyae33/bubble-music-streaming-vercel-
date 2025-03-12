import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import { ReactNode } from "react";

async function Main({ children }: { children: ReactNode }) {
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <main
      className={clsx("px-1 h-full flex-1 overflow-y-scroll", {
        "md:pl-[70px]": deviceFromUserAgent === "desktop", //
        "pb-[70px]": deviceFromUserAgent === "mobile",
      })}
    >
      {children}
    </main>
  );
}

export default Main;
