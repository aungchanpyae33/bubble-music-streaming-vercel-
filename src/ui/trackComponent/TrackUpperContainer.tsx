import { DeviceCheck } from "@/lib/DeviceCheck";
import clsx from "clsx";
import { SongInfo } from "@/database/data";
import InfoSong from "../searchPage/topResult/InfoSong";
import AlbumImg from "../albumContainer/AlbumImg";

async function TrackUpperContainer({ songs }: { songs: SongInfo }) {
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
      <AlbumImg cover_url={songs.cover_url} />
      <div
        className={clsx("pt-2 max-w-full space-y-4  truncate flex-1 ", {
          "self-start ":
            deviceFromUserAgent === "mobile" ||
            deviceFromUserAgent === "tablet",
        })}
      >
        <p
          className={clsx("font-black truncate", {
            "text-3xl md:text-5xl lg:text-6xl":
              deviceFromUserAgent === "desktop",
            "text-2xl md:text-4xl lg:text-6xl ":
              deviceFromUserAgent === "mobile" ||
              deviceFromUserAgent === "tablet",
          })}
        >
          {songs.name}
        </p>
        <div className="flex items-center ">
          <span className=" border text-base lg:text-lg font-medium p-1 mr-2">
            {songs?.type?.toUpperCase()}
          </span>
          <span className=" flex">
            <InfoSong songInfo={songs} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default TrackUpperContainer;
