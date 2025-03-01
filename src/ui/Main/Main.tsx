import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import { ReactNode } from "react";

async function Main({ children }: { children: ReactNode }) {
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <main
      className={clsx("px-1   pt-[5px] pb-[70px]", {
        "sm:pl-[70px]": deviceFromUserAgent === "desktop", //
      })}
    >
      {children}
    </main>
  );
}

export default Main;
