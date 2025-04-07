import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import { ReactNode } from "react";

async function Main({ children }: { children: ReactNode }) {
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <main
      className={clsx(" h-full flex-1 overflow-y-auto ", {
        // padding pl-[70px] make extra bleed width overflow when children element is sticky top
        "md:ml-[70px]": deviceFromUserAgent === "desktop",
        "pb-[70px]": deviceFromUserAgent === "mobile",
      })}
    >
      {children}
    </main>
  );
}

export default Main;
