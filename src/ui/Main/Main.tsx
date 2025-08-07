import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import { ReactNode } from "react";

async function Main({ children }: { children: ReactNode }) {
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <main
      className={clsx(
        " h-full  flex-1 overflow-y-auto [transform:translateZ(0)]",
        // [transform:translateZ(0)] for hardware acceleration , without this , it feels junky in chrome and some webkit browser
        {
          // padding pl-[70px] make extra bleed width overflow when children element is sticky top
          "md:ml-[70px]": deviceFromUserAgent === "desktop",
        }
      )}
    >
      <div className="max-w-[1324px] mx-auto lg:p-10 md:p-6 sm:p-3 p-2 ">
        {children}
      </div>
    </main>
  );
}

export default Main;
