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
        <h1 className="text-blue-500">playlist</h1>
        <h1 className="text-3xl text-white">{description}</h1>
        <span className="text-white">by Bubble</span>
      </div>
    </div>
  );
}

export default AlbumUpperContainer;
