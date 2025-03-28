import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import Image from "next/image";
import AlbumImg from "./AlbumImg";

async function AlbumUpperContainer({ description }: { description: string }) {
  const deviceFromUserAgent = await DeviceCheck();
  return (
    <div
      className={clsx("Container w-full flex  items-center p-5 ", {
        "flex-col":
          deviceFromUserAgent === "mobile" || deviceFromUserAgent === "tablet",
        "gap-4":
          deviceFromUserAgent === "mobile" || deviceFromUserAgent === "tablet",
        "gap-8 md:gap-10 lg:gap-12": deviceFromUserAgent === "desktop",
      })}
    >
      <AlbumImg />
      <div
        className={clsx("pt-2 flex-1 ", {
          "self-start":
            deviceFromUserAgent === "mobile" ||
            deviceFromUserAgent === "tablet",
        })}
      >
        <h1 className="">playlist</h1>
        <h1
          className={clsx("", {
            "text-3xl": deviceFromUserAgent === "desktop",
            "text-2xl":
              deviceFromUserAgent === "mobile" ||
              deviceFromUserAgent === "tablet",
          })}
        >
          {description}
        </h1>
        <span className="">by Bubble</span>
      </div>
    </div>
  );
}

export default AlbumUpperContainer;
