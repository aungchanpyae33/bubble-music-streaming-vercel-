import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import AlbumImg from "./AlbumImg";
import { listSongsSection } from "@/database/data";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
import { outputRelatedType } from "@/lib/prototypeOuputRelatedType";
import OfficialBadgeName from "./OfficialBadgeName";

async function AlbumUpperContainer({ songs }: { songs: listSongsSection }) {
  const deviceFromUserAgent = await DeviceCheck();
  const relatedType = outputRelatedType(songs.type);
  const is_official_exist = songs?.is_official;
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
        className={clsx("pt-2 truncate flex-1 ", {
          "self-start":
            deviceFromUserAgent === "mobile" ||
            deviceFromUserAgent === "tablet",
        })}
      >
        <h1 className="">{songs.type}</h1>
        <h1
          className={clsx("", {
            "text-3xl": deviceFromUserAgent === "desktop",
            "text-2xl":
              deviceFromUserAgent === "mobile" ||
              deviceFromUserAgent === "tablet",
          })}
        >
          {songs.name}
        </h1>
        <div className=" flex">
          {is_official_exist && <OfficialBadgeName />}
          {relatedType && (
            <UnderLineLinkHover
              href={`/${relatedType}/${songs.related_id}`}
              prefetch={false}
              className=""
            >
              {songs.related_name}
            </UnderLineLinkHover>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlbumUpperContainer;
